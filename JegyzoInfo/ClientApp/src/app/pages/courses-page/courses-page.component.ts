import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { Esemeny } from 'src/app/interfaces/esemeny';

@Component({
  selector: 'app-courses-page',
  templateUrl: './courses-page.component.html',
  styleUrls: ['./courses-page.component.scss']
})
export class CoursesPageComponent implements OnInit {

  events: Esemeny[] = [];

  constructor(
    private courseService: CourseService,
    ) { }

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
