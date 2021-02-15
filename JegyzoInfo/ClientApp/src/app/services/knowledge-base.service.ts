import { Folyamat } from './../interfaces/folyamat';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeBaseService {

  constructor(private http: HttpClient) { }

  getFolyamats(): Observable<Folyamat[]>{
    return this.http.get<Folyamat[]>("/api/KnowledgeBase/GetFolyamats");
  }
}
