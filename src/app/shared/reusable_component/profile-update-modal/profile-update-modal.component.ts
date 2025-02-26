import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { UserService } from '../../../core/service/user/user.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormValidator } from '../../../core/class/FormValidator';
import { User } from '../../../core/model/User.interface';

@Component({
  selector: 'app-profile-update-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './profile-update-modal.component.html',
  styleUrl: './profile-update-modal.component.css',
})
export class ProfileUpdateModalComponent implements OnInit, OnDestroy {
  @Output() onCancel = new EventEmitter<any>();
  @Output() onConfirm = new EventEmitter<any>();

  private formValidator!: FormValidator;
  private subscription!: Subscription;
  private selectedFile: File | null = null;
  protected profileUpdateForm!: FormGroup;
  protected user!: User;
  protected profilePreview!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getUserDetails() {
    this.subscription = this.userService.getUser().subscribe((res: any) => {
      this.user = res;
      this.profilePreview = this.user.profile;
      this.initUpdateForm();
    });
  }

  initUpdateForm(): void {
    this.profileUpdateForm = this.formBuilder.group({
      name: new FormControl(this.user?.name || '', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(this.user?.email || '', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      profile: new FormControl(null, []),
    });

    this.formValidator = new FormValidator(this.profileUpdateForm);
  }

  onClickConfirm() {
    const formData = new FormData();
    Object.keys(this.profileUpdateForm.value).forEach((key: any) => {
      formData.append(key, this.profileUpdateForm.value[key]);
    });
    if (this.selectedFile) {
      formData.append('profile', this.selectedFile, this.selectedFile.name);
    }
    this.onConfirm.emit(formData);
  }

  onClickCancel() {
    this.onCancel.emit();
  }

  checkInputFields(field: string, validators: string[]) {
    return this.formValidator.checkInputFields(field, validators);
  }

  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.profilePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}
