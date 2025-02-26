import { AfterViewInit, Component, model, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../core/service/user/user.service';
import { initFlowbite, Modal } from 'flowbite';
import { ProfileUpdateModalComponent } from '../../../shared/reusable_component/profile-update-modal/profile-update-modal.component';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../core/service/http/auth/auth.service';
import { ToastNotificationService } from '../../../core/service/toast/toast-notification.service';
import { User } from '../../../core/model/User.interface';

@Component({
  selector: 'app-profile',
  imports: [ProfileUpdateModalComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private userService: UserService, private authService: AuthService, private toastService: ToastNotificationService) {}
  protected user!: User;
  private modal: Modal | null = null;
  private subscription!:Subscription;
  ngOnInit(): void {
    this.subscription = this.userService.getUser().subscribe((res: any) => {
      this.user = res;
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();
    const modalEl = document.getElementById('update-profile');
    if (modalEl) {
      this.modal = new Modal(modalEl);
    }
  }

  showModelForm() {
    this.modal?.show();
  }

  dismissModal() {
    this.modal?.hide();
  }
  onUpdateProfile(updated:any){
    this.subscription = this.authService.updateUser(updated).subscribe({
      next: (res: any) => {
        this.userService.setUser();
        this.toastService.showToast('Profile updated successfully', 'success');
      },
      error: (error: any) => {
        this.toastService.showToast('Failed to update profile', 'error');
      }
    });
    this.dismissModal();

  }

  ngOnDestroy(): void {
    if(this.subscription) this.subscription.unsubscribe();
  }
}
