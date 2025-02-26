import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { initFlowbite } from 'flowbite';
import { AuthService } from '../../core/service/http/auth/auth.service';
import { ToastNotificationService } from '../../core/service/toast/toast-notification.service';
import { UserService } from '../../core/service/user/user.service';
import { ThemeToggleComponent } from '../../shared/reusable_component/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, ThemeToggleComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  protected user!: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastNotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    initFlowbite();
    this.subscription = this.userService.getUser().subscribe((res: any) => {
      this.user = res;
    });
  }

  onSignOut(): void {
    this.subscription = this.authService.logout().subscribe({
      next: (res: any) => {
        this.userService.clearUser();
        this.toastService.showToast('Logged out', 'success');
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.toastService.showToast('Something went wrong', 'error');
      },
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
