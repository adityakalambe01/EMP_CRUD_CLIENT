import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeConstant } from '../../../core/constant/employee.constant';
import { FormValidator } from '../../../core/class/FormValidator';
import { Employee } from '../../../core/model/Employee.interface';
import { EmployeeService } from '../../../core/service/http/employee/employee.service';
import { ToastNotificationService } from '../../../core/service/toast/toast-notification.service';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.css',
})
export class EmployeeFormComponent implements OnInit, OnDestroy {
  EmployeeConstant = EmployeeConstant;
  private subscription!: Subscription;
  public employeeForm!: FormGroup;
  protected _id!: string;
  protected employee!: Employee;
  private formValidator!: FormValidator;
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private toastService: ToastNotificationService,
    private router:Router
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.initEmployeeForm();
    this.getEmployeeId();
  }

  initEmployeeForm(): void {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      gender: ['', Validators.required],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: [0, Validators.required],
    });
    this.formValidator = new FormValidator(this.employeeForm);
  }

  getEmployeeId(): void {
    this.subscription = this.activatedRoute.params.subscribe({
      next: (res: any) => {
        this._id = res._id;
        if (this._id) this.getEmployeeDetails();
      },
      error: (error: any) => {
        // this.toastService.showToast('Something went wrong', 'error');
      },
    });
  }

  getEmployeeDetails(): void {
    this.subscription = this.employeeService
      .getEmployeeDetails(this._id)
      .subscribe({
        next: (res: any) => {
          this.employee = res.employee;
          this.employeeForm.patchValue(this.employee);
        },
        error: (error: any) => {
          this.toastService.showToast(error.error.message, 'error');
        },
      });
  }

  onSubmitNewemployee(): void {
    if(this.employeeForm.invalid){
      this.toastService.showToast('Please fill all required fields', 'error');
      this.employeeForm.markAllAsTouched();
      return;
    }
    this.subscription = this.employeeService
      .addEmployee(this.employeeForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastService.showToast('New Employee Added!', 'success');
          this.initEmployeeForm();
        },
        error: (error: any) => {
          this.toastService.showToast(error.error.message, 'error');
        },
      });
  }

  onSubmitUpdateEmployee(): void {
    this.subscription = this.employeeService
      .updateEmployee(this._id, this.employeeForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastService.showToast('Employee Updated!', 'success');
          this.router.navigate(['/admin/employees']);
        },
        error: (error: any) => {
          this.toastService.showToast(error.error.message, 'error');
        },
      });
  }

  checkInputFields(field: string, error: string[]) {
    return this.formValidator.checkInputFields(field, error);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
