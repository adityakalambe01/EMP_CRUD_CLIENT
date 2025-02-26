import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { PaginationComponent } from '../../../shared/reusable_component/pagination/pagination.component';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { initFlowbite, Modal } from 'flowbite';
import { CheckboxDropdownComponent } from '../../../shared/reusable_component/checkbox-dropdown/checkbox-dropdown.component';
import { FormsModule } from '@angular/forms';
import { EmployeeConstant } from '../../../core/constant/employee.constant';
import { Employee } from '../../../core/model/Employee.interface';
import { EmployeeService } from '../../../core/service/http/employee/employee.service';
import { ToastNotificationService } from '../../../core/service/toast/toast-notification.service';
import { DeleteModelComponent } from '../../../shared/reusable_component/delete-model/delete-model.component';

@Component({
  selector: 'app-employee-list',
  imports: [
    PaginationComponent,
    RouterLink,
    CommonModule,
    CurrencyPipe,
    CheckboxDropdownComponent,
    FormsModule,
    DeleteModelComponent
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css',
})
export class EmployeeListComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription!: Subscription;
  protected employees!: Employee[];
  protected EmployeeConstant = EmployeeConstant;
  protected pagination = {
    currentPage: 0,
    totalPages: 0,
    totalEmployees: 0,
    limit: 0,
  };
  protected nameOrEmail: string = '';
  protected _id = signal<string>('');
  protected queryParams: any = {
    page: 1,
    limit: 10,
    sort: {
      salary: '',
      department: '',
      email: '',
      position: '',
      name: '',
    },
    search: {
      departments: [],
      position: [],
      nameOrEmail: '',
    },
  };

  modal: Modal | null = null;

  constructor(
    private employeeService: EmployeeService,
    private toastService: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  ngAfterViewInit(): void {
    initFlowbite();
    const modalEl = document.getElementById('popup-modal');
    if (modalEl) {
      this.modal = new Modal(modalEl);
    }
  }

  getEmployees(): void {
    this.subscription = this.employeeService
      .getEmployees(this.queryParams)
      .subscribe({
        next: (res: any) => {
          this.employees = res.employees;
          this.pagination = {
            currentPage: res.currentPage,
            totalPages: res.totalPages,
            totalEmployees: res.totalEmployees,
            limit: res.limit,
          };
        },
        error: (err: any) => {
          this.toastService.showToast('Something went wrong', 'error');
        },
      });
  }

  onDeleteEmployee(_id: string): void {
    this.employeeService.deleteEmployee(_id).subscribe({
      next: (res: any) => {
        this.toastService.showToast('Employee deleted successfully', 'success');
        this.getEmployees();
      },
      error: (err: any) => {
        this.toastService.showToast(err.error.message, 'error');
      },
    });

    this.resetId('');
  }

  setId(_id: string | any) {
    this._id.set(_id);
    this.modal?.show();
  }

  resetId(_id: string) {
    this._id.set('');
    this.modal?.hide();
  }
  onPageChange(page: number): void {
    this.queryParams.page = page;
    this.getEmployees();
  }
  onLimitChange(limit: number): void {
    this.queryParams.limit = limit;
    this.onPageChange(1);
  }

  updateSorting(object: any, value: string) {
    if (!value) {
      this.queryParams.sort[object] = 'asc';
    } else if (value === 'asc') {
      this.queryParams.sort[object] = 'desc';
    } else {
      this.queryParams.sort[object] = '';
    }
    this.getEmployees();
  }

  updateList(list: string[], value: string): string[] {
    if (list.includes(value)) {
      return list.filter((dept: string) => dept !== value);
    }
    return [...list, value];
  }

  updateDept(dept: string) {
    this.queryParams.search.departments = this.updateList(
      this.queryParams.search.departments,
      dept
    );

    this.getEmployees();
  }

  updatePosition(position: string) {
    this.queryParams.search.position = this.updateList(
      this.queryParams.search.position,
      position
    );

    this.getEmployees();
  }

  setNameOrEmail() {
    this.queryParams.search.nameOrEmail = this.nameOrEmail;
    this.getEmployees();
  }

  resetNameOrEmail() {
    this.queryParams.search.nameOrEmail = '';
    this.nameOrEmail = '';
    this.getEmployees();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
