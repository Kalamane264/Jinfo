import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../interfaces/video';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
    ) { }

  GetLegfrissebbVideok(max: number): Observable<Video[]>{
    this.spinnerService.showSpinner();
    let $o = this.http.get<Video[]>("/api/Video/GetLegfrissebbVideokBySiteID/" + max);
    $o.subscribe(resp => {
      this.spinnerService.hideSpinner();
    });
    return $o;
  }
}
