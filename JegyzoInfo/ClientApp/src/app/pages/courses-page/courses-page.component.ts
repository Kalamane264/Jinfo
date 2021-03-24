import { Diak } from './../../interfaces/diak';
import { UserService } from 'src/app/services/user.service';
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
  diaks: Diak[] = [];
  diaksHere = false;

  constructor(
    private courseService: CourseService,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getEsemenyList();
    this.getDiaks();
  }

  getDiaks() {
    if(this.userService.user.felhasznaloID) {
      this.userService.felhasznalohozKapcsolodoDiakok(this.userService.user.felhasznaloID!).subscribe(diaks => {
        this.diaks = diaks;
        this.diaksHere = true;
        console.log('diaks:', this.diaks);
      },
      error => {
        console.log('Oops', error);
      }
      );
    }
  }

  getEsemenyList(){
    this.courseService.getEsemenyList().subscribe(events => {
      this.events = events;
      // console.log("events", events);
    });
  }
}
