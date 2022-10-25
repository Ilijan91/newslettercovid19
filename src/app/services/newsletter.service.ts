import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../models/news.model';
import { Portals } from '../models/portals.model';
import { Statistics } from '../models/statistics.model';

@Injectable({
  providedIn: 'root',
})
export class NewsletterService {
  baseURL = 'https://covid19srbija-api.herokuapp.com/';
  constructor(private http: HttpClient) {}

  getAllNews(newsUrl: string): Observable<Array<News>> {
    return this.http.get<Array<News>>(this.baseURL + newsUrl);
  }
  getPortals(): Observable<Array<Portals>> {
    return this.http.get<Array<Portals>>(this.baseURL + 'newspaper');
  }
  getStatistics(): Observable<Statistics> {
    return this.http.get<Statistics>(this.baseURL + 'statistics');
  }

  getHistoryStats(): Observable<Statistics> {
    return this.http.get<Statistics>(this.baseURL + 'history');
  }
}
