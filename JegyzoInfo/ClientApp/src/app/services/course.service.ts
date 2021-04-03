import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Esemeny } from '../interfaces/esemeny';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
    ) { }

  getEsemenyList(): Observable<Esemeny[]>{
    this.spinnerService.showSpinner();
    let $o = this.http.get<Esemeny[]>("api/Courses/EsemenyList");
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
