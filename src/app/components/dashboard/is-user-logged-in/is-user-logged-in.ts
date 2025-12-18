import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {Register} from '../../register/register';
import {MatDialogActions} from '@angular/material/dialog';

@Component({
  selector: 'app-is-user-logged-in',
  imports: [MatCardModule, MatButtonModule, Register, MatDialogActions],
  templateUrl: './is-user-logged-in.html',
  styleUrl: './is-user-logged-in.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IsUserLoggedIn {

}
