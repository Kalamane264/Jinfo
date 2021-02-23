import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { Folyamat } from '../interfaces/folyamat';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.http.get<any[]>("/api/Article/getArticles");
  }

  getArticle(id: number): Observable<Article>{
    return this.http.get<Article>("/api/Article/getArticle/" + id);
  }

  getArticleBySeoUrl(seoUrl: string): Observable<Article>{
    return this.http.get<Article>("/api/Article/GetArticleBySeoUrl/" + seoUrl);
  }

  getSzakertoAdatokFullBySzakertoId(id: number): Observable<Article>{
    return this.http.get<Article>("api/Article/GetSzakertoAdatokFullBySzakertoId/" + id);
  }
}
