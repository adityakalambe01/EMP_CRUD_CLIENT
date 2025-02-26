import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormValidator } from '../../../core/class/FormValidator';
import { AuthService } from '../../../core/service/http/auth/auth.service';
import { ToastNotificationService } from '../../../core/service/toast/toast-notification.service';
@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit, OnDestroy {
  protected registrationForm!: FormGroup;
  private subscription!: Subscription;
  private formValidator!: FormValidator;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastService: ToastNotificationService
  ) {}

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.formValidator = new FormValidator(this.registrationForm);
  }

  onSubmitRegisterUser() {
    this.subscription = this.authService
      .register(this.registrationForm.value)
      .subscribe({
        next: (res: any) => {
          this.toastService.showToast('Registration successfull', 'success');
          this.initRegistrationForm();
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
