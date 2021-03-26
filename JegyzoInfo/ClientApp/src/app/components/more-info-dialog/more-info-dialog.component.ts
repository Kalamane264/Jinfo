import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-more-info',
  templateUrl: './more-info-dialog.component.html',
  styleUrls: ['./more-info-dialog.component.scss']
})
export class MoreInfoDialogComponent implements OnInit {

  form = {
    Name: "",
    Position: "",
    Settlement: "",
    Phone: ""
  };

  constructor(
    private dialogRef: MatDialogRef<MoreInfoDialogComponent>,
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

