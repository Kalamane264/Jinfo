import { ThxDialogData } from './../../interfaces/thx-dialog-data';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';

@Component({
  selector: 'app-thx-dialog',
  templateUrl: './thx-dialog.component.html',
  styleUrls: ['./thx-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ThxDialogComponent implements OnInit {

  data: ThxDialogData;

  constructor(
    private dialogRef: MatDialogRef<ThxDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: ThxDialogData)
    {
      this.data = data;
    }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }

  closeAndLogin() {
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
