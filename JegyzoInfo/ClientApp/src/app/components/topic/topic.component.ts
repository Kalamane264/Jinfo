import { UserService } from './../../services/user.service';
import { Folyamat } from './../../interfaces/folyamat';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TopicComponent implements OnInit {

  @Input() folyamat: Folyamat = new Folyamat();
  itsnew = false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    if(!this.folyamat.megjelenesDatum){
      this.folyamat.megjelenesDatum = new Date();
    }
    this.itsnew = this.ifItsNew(this.folyamat.megjelenesDatum);
  }

  ifItsNew(date: Date): boolean{
    date = new Date(date);
    let now = new Date();

    const diffTime = Math.abs(now.valueOf() - date.valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays <= 30) {
      return true;
    }
    return false;
  }
}
