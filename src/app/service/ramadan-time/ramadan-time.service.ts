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

  getNextEvent(now: Date): { name: string; time: Date } | null {
    const todayStr = this.formatDate(now);
    const today = this.ramadanTimes().find(r => r.date === todayStr);

    if (!today) return null;

    const sehriToday = this.parseCustomDate(today.sehri);
    const iftaarToday = this.parseCustomDate(today.iftaar);

    // Before sehri
    if (now < sehriToday) {
      return { name: 'Sehri', time: sehriToday };
    }

    // Between sehri & iftaar
    if (now < iftaarToday) {
      return { name: 'Iftaar', time: iftaarToday };
    }

    // After iftaar → tomorrow sehri
    const tomorrowDate = new Date(now);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);

    const tomorrowStr = this.formatDate(tomorrowDate);
    const tomorrow = this.ramadanTimes().find(r => r.date === tomorrowStr);

    if (tomorrow) {
      const sehriTomorrow = this.parseCustomDate(tomorrow.sehri);
      return { name: 'Sehri', time: sehriTomorrow };
    }

    return null;
  }

  getAllTimes(): Observable<RamadanTimeModel[]> {
    return this.http.get<RamadanTimeModel[]>(this.jsonUrl);
  }

  private formatDate(date: Date): string {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}-${m}-${y}`;
  }

  private parseCustomDate(dateString: string): Date {
    const [datePart, timePart] = dateString.split('T');
    const [day, month, year] = datePart.split('-');
    const [hours, minutes, seconds] = timePart.split(':');

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
      Number(seconds)
    );
  }
}
