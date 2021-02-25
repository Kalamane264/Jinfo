import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../interfaces/Video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) { }

  GetLegfrissebbVideokBySiteID(max: number): Observable<Video[]>{
    return this.http.get<Video[]>("/api/Video/GetLegfrissebbVideokBySiteID/" + max);
  }
}
