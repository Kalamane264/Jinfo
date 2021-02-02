import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.scss']
})
export class ChapterComponent implements OnInit {

  @Input() opened = false;

  constructor() { }

  ngOnInit(): void {
  }

  open(){
    this.opened = !this.opened;
  }
}
