import { Component } from '@angular/core';
import { UserService } from './auth/user-service';
import { MatDialog } from '@angular/material/dialog';
import { Profile } from './auth/profile/profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  profileOpened: boolean = false;

  constructor(public userService: UserService, public dialog: MatDialog) {}
  
  openProfile(userId: number) {

    const user = this.userService.getUserById(userId);

    if (user) {
      this.profileOpened = true;

      const profileDialog = this.dialog.open(Profile, {
        disableClose: true,
        width: '50ww',
        data: { user }
      });

      profileDialog.afterClosed().subscribe(() => {
        this.profileOpened = false;
      });
    } else {
      console.error('User not found for ID: ', userId);
    }
  }

  logOut() {
    this.userService.currentUser = UserService.dummyUserList[0];
  }
}
