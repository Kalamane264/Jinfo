import { UserService } from './../../services/user.service';
import { Folyamat } from './../../interfaces/folyamat';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ThxDialogData } from 'src/app/interfaces/thx-dialog-data';
import { ThxDialogComponent } from '../thx-dialog/thx-dialog.component';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChapterComponent implements OnInit {

  @Input() opened = false;
  @Input() folyamat = new Folyamat();
  @Input() serial = 0;
  @Input() imAlone = false;

  aboutList: string[] = [];

  form = {
    felhasznaloID: 0,
    kerdes: ""
  }

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) {
    this.form.felhasznaloID = userService.user.felhasznaloID!;
  }

  ngOnInit(): void {
    if(this.folyamat.lead) {
      this.makeAboutList(this.folyamat.lead);
    }
  }

  makeAboutList(lead: string) {
    let aboutList = lead.split('|');
    this.aboutList = aboutList.map(val => {
      return val.trim();
    }).filter(val => val !== "");
    // console.log('aboutList', this.aboutList);
  }

  question() {
    this.userService.kerdes(this.form).subscribe(resp => {
      if(resp) {
        this.thx();
        this.form.kerdes = '';
      }
      else{
        alert('A beküldés során hiba történt. Kérjük, próbálja meg később!');
      }
    });
  }

  thx(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let data = new ThxDialogData();
    data.textH4 = 'Köszönjük kérdését';
    data.textP = 'Szakértőnk válaszát e-mail címére továbbítjuk, legkésőbb 5 munkanapon belül. ';
    data.closeAndLogin = false;
    data.buttText = 'Vissza a Tudástárba';
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ThxDialogComponent, dialogConfig);
  }

  open(){
    this.opened = !this.opened;
  }
}
