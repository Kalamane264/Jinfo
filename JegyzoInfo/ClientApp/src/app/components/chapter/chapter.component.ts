import { Folyamat } from './../../interfaces/folyamat';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  open(){
    this.opened = !this.opened;
  }
}
