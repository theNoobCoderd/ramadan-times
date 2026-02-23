import {Component, OnInit, signal} from '@angular/core';
import {RamadanTimeModel} from '../../models/ramadan-time.model';
import {RamadanTimeService} from '../../service/ramadan-time/ramadan-time.service';

@Component({
  selector: 'app-date-hero',
  imports: [],
  templateUrl: './date-hero.component.html',
  styleUrl: './date-hero.component.scss'
})
export class DateHeroComponent implements OnInit {

  ramadanTimes = signal<RamadanTimeModel[]>([]);

  now = signal(new Date());

  constructor(private ramadanTimeService: RamadanTimeService) { }

  ngOnInit(): void {
    this.ramadanTimeService.getAllTimes().subscribe((data: RamadanTimeModel[]) => {
      this.ramadanTimes.set(data);
    });
  }
}
