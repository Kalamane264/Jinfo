import { ForgotPassDialogComponent } from './../forgot-pass-dialog/forgot-pass-dialog.component';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {

  pwHide = true;

  form = {
    Email: "hivessy@menedzserpraxis.hu",
    Password: "123456"
  };

  constructor(
    private dialogRef: MatDialogRef<LoginDialogComponent>,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.userService.login(this.form.Email, this.form.Password).subscribe(user => {
      if(user) {
        this.dialogRef.close();
      } else {
        alert("Hibás felhasználónév / jelszó!");
      }
    });
  }

  clickForgot(){

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(ForgotPassDialogComponent, dialogConfig);

    this.close();
  }
}
