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

  isPastIftarTime = computed(() => {
    return this.ramadanTimeService.isPastIftarTime(this.now())
  })

  ngOnInit(): void {
    this.ramadanTimeService.loadTimes();

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
}
