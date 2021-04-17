import { Article } from './../interfaces/article';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kategoria } from '../interfaces/kategoria';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) { }

  kategoriaV2sBySiteID(): Observable<Kategoria[]>{
    this.spinnerService.showSpinner();
    let $o = this.http.get<Kategoria[]>("api/Category/KategoriaV2sBySiteID");
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }

  LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDs(data: any): Observable<Article[]>{
    this.spinnerService.showSpinner();
    let $o = this.http.post<Article[]>("api/Category/LegfrissebbCikkekBySiteIDandFirstCikkIDandKategoriaV2IDs", data);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
