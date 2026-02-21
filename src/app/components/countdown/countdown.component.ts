import {Component, computed, OnDestroy, OnInit, signal} from '@angular/core';
import {RamadanTimeService} from '../../service/ramadan-time/ramadan-time.service';
import {RamadanTimeModel} from '../../models/ramadan-time.model';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy {

  constructor(private ramadanTimeService: RamadanTimeService) {}

  now = signal(new Date());
  ramadanTimes = signal<RamadanTimeModel[]>([]);

  private _timerId: any;

  // 🔹 Get today's Ramadan entry
  todayRamadan = computed(() => {
    const today = this.formatDate(this.now());
    return this.ramadanTimes().find(r => r.date === today);
  });

  // 🔹 Difference in milliseconds
  private diff = computed(() => {
    const today = this.todayRamadan();
    if (!today) return 0;

    const target = new Date(today.iftaar); // or sehri if needed
    let now = this.now();
    let number = target.getTime() - now.getTime();
    return number;
  });

  // 🔹 Countdown display signals
  hours = computed(() => {
    const d = this.diff();
    if (d <= 0) return '00';
    let s = String(Math.floor(d / 1000 / 60 / 60)).padStart(2, '0');
    return s;
  });

  minutes = computed(() => {
    const d = this.diff();
    if (d <= 0) return '00';
    let s = String(Math.floor((d / 1000 / 60) % 60)).padStart(2, '0');
    return s;
  });

  seconds = computed(() => {
    const d = this.diff();
    if (d <= 0) return '00';
    let s = String(Math.floor((d / 1000) % 60)).padStart(2, '0');
    return s;
  });

  ngOnInit(): void {
    // Load JSON once
    this.ramadanTimeService.getAllTimes().subscribe(data => {
      this.ramadanTimes.set(data);
    });

    // Start ticking
    this._timerId = setInterval(() => {
      this.now.set(new Date());
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this._timerId) {
      clearInterval(this._timerId);
    }
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
