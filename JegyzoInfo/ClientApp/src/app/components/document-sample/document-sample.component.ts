import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-sample',
  templateUrl: './document-sample.component.html',
  styleUrls: ['./document-sample.component.scss']
})
export class DocumentSampleComponent implements OnInit {

  @Input() nev = "";
  @Input() url = "";

  constructor() { }

  ngOnInit(): void {
  }

}
