import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {RamadanTimeModel} from '../../models/ramadan-time.model';

@Injectable({
  providedIn: 'root'
})
export class RamadanTimeService {
  private jsonUrl = 'assets/ramadan-days.json';

  constructor(private http: HttpClient) {}

  getTodayTime(): Observable<RamadanTimeModel | undefined> {
    const today = this.formatDate(new Date());

    return this.http.get<RamadanTimeModel[]>(this.jsonUrl).pipe(
      map(data => data.find(item => item.date === today))
    );
  }

  getAllTimes(): Observable<RamadanTimeModel[]> {
    return this.http.get<RamadanTimeModel[]>(this.jsonUrl);
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}
