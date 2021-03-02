import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getEsemenyList(): Observable<Event[]>{
    return this.http.get<Event[]>("api/Courses/EsemenyList");
  }
}
