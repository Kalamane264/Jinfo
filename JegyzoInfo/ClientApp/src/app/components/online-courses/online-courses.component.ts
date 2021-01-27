import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-online-courses',
  templateUrl: './online-courses.component.html',
  styleUrls: ['./online-courses.component.scss']
})
export class OnlineCoursesComponent implements OnInit {

  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  ngOnInit(): void {
    this.ngCarousel.pause();
  }

}
