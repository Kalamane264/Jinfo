import { Folyamat } from './../../interfaces/folyamat';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicComponent implements OnInit {

  @Input() folyamat: Folyamat;

  constructor() { }

  ngOnInit(): void {
    // console.log("folycsi", this.folyamat);
  }

}
