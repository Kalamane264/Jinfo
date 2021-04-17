import { RegistrationDialogData } from './../../interfaces/registration-dialog-data';
import { Diak } from './../../interfaces/diak';
import { UserService } from './../../services/user.service';
import { ExpertService } from './../../services/expert.service';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Esemeny } from 'src/app/interfaces/esemeny';
import { Expert } from 'src/app/interfaces/expert';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CourseComponent implements OnInit {

  @Input() event = new Esemeny();
  @Input() diaks: Diak[] = [];

  szakis: Expert[] = [];

  constructor(
    private expertService: ExpertService,
    private dialog: MatDialog,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getSzakis();
  }

  getSzakis() {
    if(this.event.szakertoIDs.length > 0) {
      this.event.szakertoIDs.forEach(szakiId => {
        this.expertService.getSzakertoAdatokFullBySzakertoId(szakiId).subscribe(szaki => {
          this.szakis.push(szaki);
          // console.log('szakis', this.szakis);
        });
      });
    }
  }

  clickRegistrationMe() {
    if(!this.userService.userLoggedIn) {
      alert('A jelentkezéshez, kérem, lépjen be!');
      return;
    }

    let data = new RegistrationDialogData();
    data.kepzesId = parseInt(this.event.mpurl);
    data.diakMe = this.diaks.find(d => d.elsodleges === "Y")!;
    console.log('diamke', this.diaks);
    data.itsme = true;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(RegistrationDialogComponent, dialogConfig);
  }

  clickRegistration() {
    if(!this.userService.userLoggedIn) {
      alert('A jelentkezéshez, kérem, lépjen be!');
      return;
    }

    let data = new RegistrationDialogData();
    data.kepzesId = parseInt(this.event.mpurl);
    data.diakOthers = this.diaks.filter(d => d.elsodleges === "N")!;
    data.itsme = false;

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(RegistrationDialogComponent, dialogConfig);
  }
}
