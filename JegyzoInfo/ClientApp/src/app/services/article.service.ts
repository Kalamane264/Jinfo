import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../interfaces/article';
import { Folyamat } from '../interfaces/folyamat';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
    ) { }

  getArticles(): Observable<Article[]>{
    this.spinnerService.showSpinner();
    let $o = this.http.get<Article[]>("/api/Article/getArticles");
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  getArticle(id: number): Observable<Article>{
    this.spinnerService.showSpinner();
    let $o = this.http.get<Article>("/api/Article/getArticle/" + id);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  CikkFullBySEOUrlAndSiteID(seoUrl: string): Observable<Article>{
    // return this.http.get<Article>("/api/Article/GetArticleBySeoUrl/" + seoUrl);

    this.spinnerService.showSpinner();
    let $o = this.http.get<Article>("api/Category/CikkFullBySEOUrlAndSiteID/" + seoUrl);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
