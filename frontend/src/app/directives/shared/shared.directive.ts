import { Directive } from '@angular/core';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
@Directive({
  selector: '[appShared]',
  standalone: true
})
export class SharedDirective {

  constructor() { }

}


export const passwordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')
  const confirmPassword = control.get('confirmPassword')
  return password && confirmPassword && confirmPassword?.value !== password?.value ? { passwordMismatch: true } : null
}
