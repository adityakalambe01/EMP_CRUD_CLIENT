import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUpdateModalComponent } from './profile-update-modal.component';

describe('ProfileUpdateModalComponent', () => {
  let component: ProfileUpdateModalComponent;
  let fixture: ComponentFixture<ProfileUpdateModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileUpdateModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
