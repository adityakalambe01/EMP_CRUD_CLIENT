import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormValidator } from '../../../core/class/FormValidator';
import { AuthService } from '../../../core/service/http/auth/auth.service';
import { ToastNotificationService } from '../../../core/service/toast/toast-notification.service';
import { UserService } from '../../../core/service/user/user.service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  protected loginForm!: FormGroup;
  protected formValidator!: FormValidator;

  constructor(
    private authservice: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: ToastNotificationService,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
    this.formValidator = new FormValidator(this.loginForm);
  }

  onSubmitLogin(): void {
    this.subscription = this.authservice.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        this.toastService.showToast('Login successful!', 'success');
        this.userService.setUser();
        this.router.navigateByUrl('/admin/employees');
      },
      error: (error) => {
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
