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

  szakis: Expert[] = [];

  constructor(
    private expertService: ExpertService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getSzakis();
  }

  getSzakis() {
    if(this.event.szakertoIDs.length > 0) {
      this.event.szakertoIDs.forEach(szakiId => {
        this.expertService.getSzakertoAdatokFullBySzakertoId(szakiId).subscribe(szaki => {
          this.szakis.push(szaki);
          console.log('szakis', this.szakis);
        });
      });
    }
  }

  clickRegistration() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(RegistrationDialogComponent, dialogConfig);
  }
}
