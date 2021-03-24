import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-thx-dialog',
  templateUrl: './thx-dialog.component.html',
  styleUrls: ['./thx-dialog.component.scss']
})
export class ThxDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ThxDialogComponent>,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.login();
    this.dialogRef.close();
  }

  login(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(LoginDialogComponent, dialogConfig);
  }

}
