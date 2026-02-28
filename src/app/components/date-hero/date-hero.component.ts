import {Component, computed, OnInit, signal} from '@angular/core';
import {RamadanTimeModel} from '../../models/ramadan-time.model';
import {RamadanTimeService} from '../../service/ramadan-time/ramadan-time.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-date-hero',
  imports: [
    DatePipe
  ],
  templateUrl: './date-hero.component.html',
  styleUrl: './date-hero.component.scss'
})
export class DateHeroComponent implements OnInit {

  ramadanTimes = signal<RamadanTimeModel[]>([]);

  now = signal(new Date());

  constructor(private ramadanTimeService: RamadanTimeService) { }

  currentGeorgianDate = computed(() => {
    return this.ramadanTimeService.getGeorgianDate(this.now());
  });

  currentHijriDate = computed(() => {
    let currentDate = this.ramadanTimeService.getGeorgianDate(this.now());

    if (this.isBeforeSehri() && !this.isAfterIftar()) {
      return String(currentDate?.dateHijri).padStart(2, '0');
    }

    if (this.isAfterIftar()) {
      let dateHijri = currentDate?.dateHijri;
      if (!dateHijri) {
        return 0;
      }
      return String(dateHijri + 1).padStart(2, '0');
    }

    if (!this.isBeforeSehri() && !this.isAfterIftar()) {
      return String(currentDate?.dateHijri).padStart(2, '0');
    }

    return 0;
  });

  ngOnInit(): void {
    this.ramadanTimeService.getAllTimes().subscribe((data: RamadanTimeModel[]) => {
      this.ramadanTimes.set(data);
    });
  }

  isBeforeSehri = computed(() => {
    return this.ramadanTimeService.isBeforeSehri(this.now());
  });

  isAfterIftar = computed(() => {
    return this.ramadanTimeService.isAfterIftar(this.now());
  });
}
