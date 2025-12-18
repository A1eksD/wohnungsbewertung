import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {IsUserLoggedIn} from '../is-user-logged-in/is-user-logged-in';
import {UserService} from '../../../services/user-service';

@Component({
  selector: 'app-user-dialog',
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatIconModule, IsUserLoggedIn],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDialog {

  readonly dialogRef = inject(MatDialogRef<UserDialog>);

  constructor(public userService: UserService) {
  }

}
