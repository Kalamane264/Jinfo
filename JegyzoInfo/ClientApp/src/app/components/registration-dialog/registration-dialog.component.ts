import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.scss']
})
export class RegistrationDialogComponent implements OnInit {

  form = {
    Name: "Ifj. Varga Kálmán",
    NameBirth: "Varga Kálmán",
    MothersName: "Kurucsó Angéla",
    SettlementOfBirth: "Pécs",
    CountryOfBirth: "Afganisztán",
    TaxNumber: "12345678910",
    Email: "",
    Phone: ""
  };

  constructor(
    private dialogRef: MatDialogRef<RegistrationDialogComponent>,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    console.log("Submit");
    /* this.contactService.saveContactForm(this.form).subscribe(resp => {
      if(resp === true) {
        alert("Köszönjük érdeklődését!");
        this.dialogRef.close();
      }
    }); */
  }
}
