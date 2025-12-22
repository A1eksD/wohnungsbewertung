import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {AuthService} from '../../../services/auth/auth-service';


@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  form!: FormGroup;
  hidePassword: boolean = true;

  constructor(public authService: AuthService) {
    this.form = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);
}
