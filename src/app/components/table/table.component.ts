import {Component, computed, OnInit, signal} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {RamadanTimeService} from '../../service/ramadan-time/ramadan-time.service';
import { RamadanTimeModel } from '../../models/ramadan-time.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-table',
  imports: [MatTableModule, DatePipe],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['date', 'sehri', 'iftar'];
  ramadanTimes = signal<RamadanTimeModel[]>([]);

  now = signal(new Date());

  displayedRamadanTimes = computed(() => {
    const today = this._stripTime(this.now());

    const start = new Date(today);
    const end = new Date(today);

    start.setDate(today.getDate() - 2);
    end.setDate(today.getDate() + 3);

    return this.ramadanTimes().flatMap(r => {
      const d = this._stripTime(new Date(r.date));

      if (d < start || d > end) return [];

      return [{
        ...r,
        isToday: d.getTime() === today.getTime()
      }];
    });
  });

  constructor(private ramadanTimeService: RamadanTimeService) { }

  ngOnInit(): void {
    this.ramadanTimeService.getAllTimes().subscribe((data: RamadanTimeModel[]) => {
      this.ramadanTimes.set(data);
    })
  }

  private _stripTime(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
