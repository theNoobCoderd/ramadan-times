import {Component, OnInit, signal} from '@angular/core';
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

  constructor(private ramadanTimeService: RamadanTimeService) { }

  ngOnInit(): void {
    this.ramadanTimeService.getAllTimes().subscribe((data: RamadanTimeModel[]) => {
      this.ramadanTimes.set(data);
    })
  }
}
