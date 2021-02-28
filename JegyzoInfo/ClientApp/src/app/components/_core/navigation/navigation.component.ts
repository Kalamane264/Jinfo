import { LogoutDialogComponent } from './../../logout-dialog/logout-dialog.component';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  menuIsOpened = false;
  loginIsOpened = false;

  constructor(
    public userService: UserService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  clickSandvichMenu(){
    this.menuIsOpened = !this.menuIsOpened;
  }

  clickLogin(){
    this.loginIsOpened = !this.loginIsOpened;
  }

  clickLogout(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(LogoutDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(msg => {
      console.log('msg', msg);
      if(msg == 'logout') {
        this.userService.logout();
      }
    });
  }

  logSucc(e: string) {
    console.log(e);
    this.loginIsOpened = false;
  }
}
