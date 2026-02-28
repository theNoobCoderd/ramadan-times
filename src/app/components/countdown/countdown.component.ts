import {Component, computed, OnDestroy, OnInit, signal} from '@angular/core';
import {RamadanTimeService} from '../../service/ramadan-time/ramadan-time.service';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy {

  constructor(private ramadanTimeService: RamadanTimeService) {}

  now = signal(new Date());

  private _timerId: any;

  private getNextEvent = computed(() => {
    return this.ramadanTimeService.getNextEvent(this.now())
  })

  // 🔹 Countdown display signals
  hours = computed(() => {
    const nextEvent = this.getNextEvent();
    if (nextEvent <= 0) return '00';
    return String(Math.floor(nextEvent / 1000 / 60 / 60)).padStart(2, '0');
  });

  minutes = computed(() => {
    const nextEvent = this.getNextEvent();
    if (nextEvent <= 0) return '00';
    return String(Math.floor((nextEvent / 1000 / 60) % 60)).padStart(2, '0');
  });

  seconds = computed(() => {
    const nextEvent = this.getNextEvent();
    if (nextEvent <= 0) return '00';
    return String(Math.floor((nextEvent / 1000) % 60)).padStart(2, '0');
  });

  isBeforeSehri = computed(() => {
    return this.ramadanTimeService.isBeforeSehri(this.now());
  });

  isAfterIftar = computed(() => {
    return this.ramadanTimeService.isAfterIftar(this.now());
  })

  ngOnInit(): void {
    this.ramadanTimeService.loadTimes();

    // Start ticking
    this._timerId = setInterval(() => {
      this.now.set(new Date());
    }, 1000);
  }

  // // Add this method to your class
  // setTestDate(dateString: string) {
  //   // Stop the real-time interval so it doesn't overwrite your test date
  //   if (this._timerId) clearInterval(this._timerId);
  //
  //   // Set the signal to your specific test date
  //   this.now.set(new Date(dateString));
  // }
  //February 27, 2026 05:44:00

  ngOnDestroy(): void {
    if (this._timerId) {
      clearInterval(this._timerId);
    }
  }
}
