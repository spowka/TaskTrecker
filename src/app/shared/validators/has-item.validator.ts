import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isArray } from 'util';

export default function (control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (isArray(value) && value.length > 0 && value.find(i => /\S/.test(i))) {
    return null;
  }

  const error = { 'hasItem': true };
  control.setErrors(error);

  return error;
}
