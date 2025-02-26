import { CanDeactivateFn } from '@angular/router';

export const formsGuard: CanDeactivateFn<unknown> = (component:any, currentRoute, currentState, nextState) => {
  if (component.employeeForm && component.employeeForm.dirty) {
    return confirm('You have unsaved changes! Do you really want to leave?');
  }

  return true;
};
