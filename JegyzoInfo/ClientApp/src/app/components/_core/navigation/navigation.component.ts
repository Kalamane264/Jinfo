import { Router, ActivatedRoute, NavigationStart, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import {filter} from 'rxjs/operators';

import { LoginDialogComponent } from './../../login-dialog/login-dialog.component';
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
  itsHomePage = false

  constructor(
    public userService: UserService,
    private dialog: MatDialog,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.router.events
          .subscribe(
            (event: NavigationEvent) => {
              if(event instanceof NavigationStart) {
                // console.log('XXXS', event.url);
                if(event.url == '/' || event.url == "/home") {
                  this.itsHomePage = true;
                }
                else {
                  this.itsHomePage = false;
                }
              }
            });
  }

  gotoVideotar(){
    this.router.navigate(["/"]).then(() => {
      let scrollTarget = document.getElementById('scrollVideos');
      scrollTarget?.scrollIntoView({behavior: "smooth", block: "center"});
    });
  }

  clickSandvichMenu(){
    this.menuIsOpened = !this.menuIsOpened;
  }

  clickLogin(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
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
