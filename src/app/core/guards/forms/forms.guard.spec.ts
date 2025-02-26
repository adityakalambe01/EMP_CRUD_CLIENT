import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { formsGuard } from './forms.guard';

describe('formsGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formsGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
