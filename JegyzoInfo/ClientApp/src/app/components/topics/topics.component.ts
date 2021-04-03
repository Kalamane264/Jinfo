import { Folyamat } from './../../interfaces/folyamat';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit {

  @Input() folyamats: Folyamat[] = [];

  constructor() { }

  ngOnInit(): void {
    console.log('folyamats in topics', this.folyamats)
  }

}
