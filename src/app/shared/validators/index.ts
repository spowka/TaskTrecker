import equalsValidatorFactory from './match-password.validator';
import hasItemValidator from './has-item.validator';

export default class CustomValidators {
  /**
   * @description
   * Factory which returns a
   * validator that requires two controlsl to have the same value.
   * This validator may be used for ensuring that password and confirm password fields are equal.
   *
   * @usageNotes
   *
   *
   * ### Validate that the field is non-empty
   *
   * ```typescript
   * const control1 = new FormGroup({
   *   x: new FormControl(null),
   *   y: new FormControl(null)
   * }, [CustomValidators.equals('x', 'y')]);
   * const control2 = new FormControl('', CustomValidators.equals(control1));
   *
   * console.log(control.errors); // {equals: true}
   * ```
   *
   * @returns A validator whcih returns an error map with the `equals` property
   * if the validation check fails, otherwise `null`.
   *
   */
  static equals = equalsValidatorFactory;

  /**
   * @description
   * Validator that requires an FormArray to contain not empty items.
   * This validator may be used for ensuring that there is an item which has a value.
   *
   * @usageNotes
   *
   *
   * ### Validate that the FormArray has non-empty item
   *
   * ```typescript
   * const control = new FormControl('', CustomValidators.hasItem);
   *
   * console.log(control.errors); // {hasItem: true}
   * ```
   *
   * @returns An error map with the `hasItem` property
   * if the validation check fails, otherwise `null`.
   *
   */
  static hasItem = hasItemValidator;
}
