import { Injectable } from '@angular/core';
import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PwEmailValidator {

  strongPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (!value) return null;

    const hasNumber = /[0-9]/.test(value);
    const hasUppercase = /[A-Z]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>']/.test(value);

    const valid = hasNumber && hasUppercase && hasSpecialChar;

    return valid
      ? null
      : { strongPassword: true };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const g = group as FormGroup;
    const pw1 = g.get('password')?.value;
    const pw2 = g.get('password2')?.value;

    return pw1 === pw2 ? null : { passwordMismatch: true };
  }

  strictEmailValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    return emailRegex.test(value)
      ? null
      : { strictEmail: true };
  }
}
