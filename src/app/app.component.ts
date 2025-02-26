import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastNotificationService } from './core/service/toast/toast-notification.service';
import { ToastComponent } from './shared/reusable_component/toast/toast.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private toastService: ToastNotificationService) {}

  ngOnInit(): void {
    this.toastService.toastMessage$.subscribe();
  }
}
