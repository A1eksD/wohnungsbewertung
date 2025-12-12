import { Component } from '@angular/core';
import {Header} from '../shared/header/header';
import {Dashboard} from './dashboard/dashboard';
import {Footer} from '../shared/footer/footer';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-components',
  imports: [
    Header,
    Dashboard,
    Footer,
    CommonModule
  ],
  templateUrl: './components.html',
  styleUrl: './components.scss',
})
export class Components {

}
