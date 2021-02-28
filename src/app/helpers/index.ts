import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export const confirmedValidator: ValidatorFn = (control: AbstractControl) => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  return password && confirmPassword && password === confirmPassword
    ? { passwordMatch: true }
    : null;
};
