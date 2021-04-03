import { ExpertService } from './../../services/expert.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { Esemeny } from 'src/app/interfaces/esemeny';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-online-courses',
  templateUrl: './online-courses.component.html',
  styleUrls: ['./online-courses.component.scss']
})
export class OnlineCoursesComponent implements OnInit {

  @ViewChild('ngcarousel', { static: true }) ngCarousel: NgbCarousel;

  events: Esemeny[] = [];

  constructor(
    private courseService: CourseService,
    private expertService: ExpertService
    ) { }

  ngOnInit(): void {
    this.getEsemenyList();
    this.ngCarousel.pause();
  }

  getEsemenyList(){
    this.courseService.getEsemenyList().subscribe(events => {
      events.forEach(evt => {
        evt.szakis = [];
      });
      this.events = events;

      console.log("online events", events);

      this.events.forEach(evt => {
        if(evt.szakertoIDs.length) {
          this.expertService.getSzakertoAdatokFullBySzakertoId(evt.szakertoIDs[0]).subscribe(szaki => {
            console.log("szaki", szaki);
            evt.szakis.push(szaki);
          })
        }
      });
    });
  }
}
