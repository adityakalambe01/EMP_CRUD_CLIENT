import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { formsGuard } from '../../core/guards/forms/forms.guard';
import { ProfileComponent } from './profile/profile.component';


export const employeeRoutes: Routes = [
  {
    path: 'employees',
    component: EmployeeListComponent,
  },
  {
    path: 'employees/add',
    component: EmployeeFormComponent,
    canDeactivate: [formsGuard],
  },

  {
    path: 'employees/edit/:_id',
    component: EmployeeFormComponent,
    canDeactivate: [formsGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
];
