import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function equalsValidatorFactory(name1: string, name2: string, namespace?: string) {
  return function (control: AbstractControl): ValidationErrors | null {
    const value = control.get(name1).value;
    const equalToValue = control.get(name2).value;

    if (value !== equalToValue) {
      const error = { [namespace ? `equals.${namespace}` : 'equals']: true };
      control.setErrors(error);

      return error;
    }

    return null;
  };
}
