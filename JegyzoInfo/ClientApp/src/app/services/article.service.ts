import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Folyamat } from '../interfaces/folyamat';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<any[]>{
    return this.http.get<any[]>("/api/Article/getArticles");
  }
}
