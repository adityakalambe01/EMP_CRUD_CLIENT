import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastNotificationService {
  private toastMessage = new BehaviorSubject<{ message: string; type: 'success' | 'error' | 'warning' | '' ; } | null>(null);
  toastMessage$ = this.toastMessage.asObservable();

  constructor() {}

  showToast(message: string, type: 'success' | 'error' | 'warning') {
    this.toastMessage.next({ message, type });

    setTimeout(() => this.clearToast(), 3000);
  }

  clearToast() {
    this.toastMessage.next(null);
  }
}
