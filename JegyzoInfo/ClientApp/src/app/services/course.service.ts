import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Esemeny } from '../interfaces/esemeny';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getEsemenyList(): Observable<Esemeny[]>{
    return this.http.get<Esemeny[]>("api/Courses/EsemenyList");
  }
}
