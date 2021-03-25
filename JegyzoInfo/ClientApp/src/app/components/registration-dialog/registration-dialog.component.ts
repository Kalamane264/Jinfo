import { UserService } from 'src/app/services/user.service';
import { Diak } from './../../interfaces/diak';
import { RegistrationDialogData } from './../../interfaces/registration-dialog-data';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact.service';
import { ThxDialogData } from 'src/app/interfaces/thx-dialog-data';
import { ThxDialogComponent } from '../thx-dialog/thx-dialog.component';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {

  form = {
    kepzesId: 0,
    felhasznaloID: 0,
    iD_DIAK: 0,
    elonev: "",
    vezeteknev: "",
    keresztnev: "",
    szuletesinev: "",
    anyjaneve: "",
    allampolgarsag: "",
    szulhely: "",
    adoszam: "",
    email: "",
    telefoN1: "",
    vegzettseg: "",

    szulEv: 1970,
    szulHonap: 0,
    szulNap: 0
  };

  public years: number[] = [];
  public months = [
    "január",
    "február",
    "március",
    "április",
    "május",
    "június",
    "július",
    "augusztus",
    "szeptember",
    "október",
    "november",
    "december"
  ];
  public days: number[] = [];
  public data: RegistrationDialogData;
  public newColleague = false;
  public selectedColleague = -1;

  constructor(
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private contactService: ContactService,
    private userService: UserService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) data: RegistrationDialogData) {
      this.data = data;
  }

  ngOnInit(): void {
    console.log('data', this.data);
    this.fillYears();
    this.reFillDays();
    this.form.felhasznaloID = this.userService.user.felhasznaloID!;
    this.form.kepzesId = this.data.kepzesId;

    if(this.data.itsme) {
      this.setFormValuesByDiak(this.data.diakMe);
      console.log('diakMe', this.data.diakMe);
    } else {
      console.log('diakOthers', this.data.diakOthers);
    }
  }

  setFormValuesByDiak(diak: Diak) {
    this.form.adoszam = diak.adoszam;
    this.form.allampolgarsag = diak.allampolgarsag;
    this.form.anyjaneve = diak.anyjaneve;
    this.form.elonev = diak.elonev;
    this.form.email = diak.email;
    this.form.iD_DIAK = diak.iD_DIAK;
    this.form.keresztnev = diak.keresztnev;
    this.form.szuletesinev = diak.szuletesinev;
    this.form.szulhely = diak.szulhely;
    let szulido = new Date(diak.szulido);
    this.form.szulEv = szulido.getFullYear();
    this.form.szulHonap = szulido.getMonth() + 1;
    this.fillDays(this.form.szulEv, this.form.szulHonap);
    this.form.szulNap = szulido.getDate();
    this.form.telefoN1 = diak.telefoN1;
    this.form.vegzettseg = diak.vegzettseg;
    this.form.vezeteknev = diak.vezeteknev;
  }

  close() {
    this.dialogRef.close();
  }

  fillYears() {
    let start = 1850;
    let end = (new Date().getFullYear());
    for(let i = start; i< end; i++) {
      this.years.push(i);
    }
  }

  reFillDays() {
    this.fillDays(this.form.szulEv, this.form.szulHonap);
  }

  fillDays(year: number, month: number) {
    this.days = [];

    let endDate = new Date(year, month, 0);
    console.log("endDate", endDate);
    let end = endDate.getDate();

    for(let i = 1; i<= end; i++) {
      this.days.push(i);
    }
  }

  newOrList() {
    this.newColleague = !this.newColleague
    if(this.newColleague) {
      this.resetForm();
    }
  }

  resetForm() {
    this.selectedColleague = -1;
    let dummyDiak = new Diak();
    dummyDiak.szulido = new Date(1970, 0, 1);
    this.setFormValuesByDiak(dummyDiak);

    console.log('form', this.form);
  }

  selectColleaGue() {
    // let diak = this.data.diakOthers[this.selectedColleague];
    this.setFormValuesByDiak(this.data.diakOthers[this.selectedColleague]);
    console.log('form', this.form);
  }

  submit() {
    console.log("Submit form:", this.form );
    this.userService.kepzesJelentkezes(this.form).subscribe(resp => {
      if(resp) {
        this.thx();
        this.close();
      } else {
        alert('A jelentkezés során hiba történt.');
      }
    },
    error => {
      console.log('Oops', error);
      alert(error.error);
    });
    /* this.thx();
    this.close(); */
  }

  thx(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    let data = new ThxDialogData();
    data.textH4 = 'Köszönjük jelentkezését!';
    data.textP = 'Most átirányítjuk a <img class="moodle" src="/assets/img/moodle.svg" alt="" /> e-learning rendszerbe, ahol tájékoztatjuk a képzéshez kapcsolódó további információkról.';
    data.buttText = "Tovább";
    dialogConfig.data = data;

    const dialogRef = this.dialog.open(ThxDialogComponent, dialogConfig);
  }
}
