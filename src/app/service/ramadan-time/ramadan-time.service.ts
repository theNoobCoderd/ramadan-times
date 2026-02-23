import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {RamadanTimeModel} from '../../models/ramadan-time.model';

@Injectable({
  providedIn: 'root'
})
export class RamadanTimeService {
  private jsonUrl = 'assets/ramadan-days.json';

  private ramadanTimes = signal<RamadanTimeModel[]>([]);

  constructor(private http: HttpClient) {}

  loadTimes() {
    this.http.get<RamadanTimeModel[]>(this.jsonUrl)
      .subscribe(data => this.ramadanTimes.set(data));
  }

  getNextEvent(now: Date): number {
    const currentDate = this.currentRamadanDay(now);
    const nextDate = this.nextRamadanDay(now);

    if (!currentDate) return 0;
    if (!nextDate) return 0

    let todayDay;
    if (this.isPastIftarTime(now)) {
      todayDay = nextDate.sehri;
    } else {
      todayDay = currentDate.iftaar;
    }

    return new Date(todayDay).getTime() - now.getTime();
  }

  isPastIftarTime(now: Date): boolean {
    const currentDate = this.currentRamadanDay(now);
    if (!currentDate) return false;

    const iftarTime = new Date(currentDate?.iftaar);
    return now.getTime() > iftarTime.getTime();
  }

  getAllTimes(): Observable<RamadanTimeModel[]> {
    return this.http.get<RamadanTimeModel[]>(this.jsonUrl);
  }

  private currentRamadanDay(now: Date): RamadanTimeModel | undefined {
    const today = this.formatDate(now);
    return this.ramadanTimes().find(r => r.date.toString() === today);
  }

  private nextRamadanDay(now: Date): RamadanTimeModel | undefined {
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formattedTomorrow = this.formatDate(tomorrow);
    return this.ramadanTimes().find(r => r.date.toString() === formattedTomorrow);
  }

  private formatDate(date: Date): string {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
  }
}
