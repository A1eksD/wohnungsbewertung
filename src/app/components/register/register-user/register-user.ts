import { Component } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatError, MatFormField, MatInput, MatLabel, MatSuffix} from "@angular/material/input";
import {MatTooltipModule} from '@angular/material/tooltip';

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

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
  passwordFormControl2 = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

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
