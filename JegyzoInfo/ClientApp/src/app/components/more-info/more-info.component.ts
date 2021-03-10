import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info.component.html',
  styleUrls: ['./more-info.component.scss']
})
export class MoreInfoComponent implements OnInit {

  form = {
    Name: "Varga Kálmán",
    Position: "fejvesztő",
    Settlement: "Pécs",
    Phone: "+36702759141"
  };

  constructor(
    private dialogRef: MatDialogRef<MoreInfoComponent>,
    private contactService: ContactService
  ) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    console.log("Submit");
    this.contactService.saveContactForm(this.form).subscribe(resp => {
      if(resp === true) {
        alert("Köszönjük érdeklődését!");
        this.dialogRef.close();
      }
    });
  }

}
