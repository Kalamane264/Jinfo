import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Expert } from '../interfaces/expert';

@Injectable({
  providedIn: 'root'
})
export class ExpertService {

  constructor(private http: HttpClient) { }

  getSzakertoAdatokFullBySzakertoId(id: number): Observable<Expert>{
    return this.http.get<Expert>("api/Expert/GetSzakertoAdatokFullBySzakertoId/" + id);
  }
}
