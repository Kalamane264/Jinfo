import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/interfaces/event';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  events: Event[] = [];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.getEsemenyList();
  }

  getEsemenyList(){
    this.courseService.getEsemenyList().subscribe(events => {
      this.events = events;
      console.log("events resp", events);
    });
  }
}
