import { ThxDialogComponent } from './../thx-dialog/thx-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-forgot-pass-dialog',
  templateUrl: './forgot-pass-dialog.component.html',
  styleUrls: ['./forgot-pass-dialog.component.scss']
})
export class ForgotPassDialogComponent implements OnInit {

  pwHide = true;

  form = {
    Email: "",
    Password: ""
  };

  constructor(
    private dialogRef: MatDialogRef<ForgotPassDialogComponent>,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.userService.passwordReminder(this.form.Email).subscribe(resp => {
      if(resp == true) {
        this.thx();
        this.close();
      } else {
        alert('A küldés során hiba történt.');
      }
    });
  }

  thx(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(ThxDialogComponent, dialogConfig);
  }

}
