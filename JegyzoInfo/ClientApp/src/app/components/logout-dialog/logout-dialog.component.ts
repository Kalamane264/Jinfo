import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<LogoutDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  logout() {
    this.dialogRef.close('logout');
  }
}
