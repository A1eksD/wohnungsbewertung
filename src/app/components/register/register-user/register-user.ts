import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatTooltipModule} from '@angular/material/tooltip';
import {PwEmailValidator} from '../../../services/validators/pw-email-validator';
import {AuthService} from '../../../services/auth/auth-service';

@Component({
  selector: 'app-register-user',
    imports: [
        FormsModule,
        MatButton,
        MatError,
        MatFormField,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule,
        MatTooltipModule
    ],
  templateUrl: './register-user.html',
  styleUrl: './register-user.scss',
})
export class RegisterUser {

  hidePassword: boolean = true;
  hidePassword2: boolean = true;
  emailFormControl!: FormControl;
  nameFormControl!: FormControl;
  passwordFormControl!: FormControl;
  passwordFormControl2!: FormControl;
  form!: FormGroup;

  constructor(private pwEmailValidator: PwEmailValidator, public authService: AuthService) {

    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
      this.pwEmailValidator.strictEmailValidator
    ]);

    this.nameFormControl = new FormControl('', [
      Validators.required
    ]);

    this.passwordFormControl = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.pwEmailValidator.strongPasswordValidator
    ]);

    this.passwordFormControl2 = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      this.pwEmailValidator.strongPasswordValidator
    ]);

    this.form = new FormGroup(
      {
        email: this.emailFormControl,
        name: this.nameFormControl,
        password: this.passwordFormControl,
        password2: this.passwordFormControl2
      },
      { validators: this.pwEmailValidator.passwordMatchValidator }
    );
  }

  generateName(): void {
    const vowels = 'aeiou';
    const consonants = 'bcdfghjklmnpqrstvwxyz';

    const length = Math.floor(Math.random() * (12 - 4 + 1)) + 4;

    let name = '';
    let useConsonant = true;

    for (let i = 0; i < length; i++) {
      const pool = useConsonant ? consonants : vowels;
      name += pool[Math.floor(Math.random() * pool.length)];
      useConsonant = !useConsonant;
    }

    name = name.charAt(0).toUpperCase() + name.slice(1);

    this.nameFormControl.setValue(name);
    this.nameFormControl.markAsDirty();
    this.nameFormControl.markAsTouched();
  }
}
