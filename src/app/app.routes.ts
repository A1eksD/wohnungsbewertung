import { Routes } from '@angular/router';
import { Login } from './components/register/login/login';
import {Register} from './components/register/register';
import {Dashboard} from './components/dashboard/dashboard';
import {Components} from './components/components';

export const routes: Routes = [
  { path: '', component: Components }
];
