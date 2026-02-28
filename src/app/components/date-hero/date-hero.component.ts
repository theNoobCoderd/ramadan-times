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
    const data = this.ramadanTimeService.getGeorgianDate(this.now());

    // Guard clause
    if (!data?.dateHijri) return "00";

    let day = data.dateHijri;

    // If it's after Iftar, the new Hijri day has started
    if (this.isAfterIftar()) {
      day++;
    }

    return String(day).padStart(2, '0');
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
