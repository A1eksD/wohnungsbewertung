import {Component} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule} from '@angular/forms';
import {RegisterUser} from './register-user/register-user';
import {Login} from './login/login';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [MatTabsModule, FormsModule, RegisterUser, Login, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
}
