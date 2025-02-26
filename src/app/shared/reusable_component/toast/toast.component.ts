import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ToastNotificationService } from '../../../core/service/toast/toast-notification.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  protected toastMessage: string = '';
  protected toastType: 'success' | 'error' | 'warning' | '' = '';

  constructor(private toastService: ToastNotificationService) {}

  ngOnInit() {
    this.toastService.toastMessage$.subscribe((toast) => {
      if (toast) {
        this.toastMessage = toast.message;
        this.toastType = toast.type;

        setTimeout(() => {
          this.toastMessage = '';
          this.toastType = '';
        }, 3000);
      }
    });
  }
}
