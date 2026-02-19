import {Component, computed, OnDestroy, OnInit, signal} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.scss'
})
export class CountdownComponent implements OnInit, OnDestroy {

  now = signal(new Date());

  hours = computed(() => this.now().getHours().toString().padStart(2, '0'));
  minutes = computed(() => this.now().getMinutes().toString().padStart(2, '0'));
  seconds = computed(() => this.now().getSeconds().toString().padStart(2, '0'));

  private _timerId: any;

  ngOnInit(): void {
    this._timerId = setInterval(() => {
      this.now.set(new Date());
    }, 500);
  }

  ngOnDestroy(): void {
    if (this._timerId) {
      clearInterval(this._timerId);
    }
  }
}
