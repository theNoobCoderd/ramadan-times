import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {CountdownComponent} from './components/countdown/countdown.component';
import {TableComponent} from './components/table/table.component';
import {DateHeroComponent} from './components/date-hero/date-hero.component';
import {PosthogService} from './service/posthog/posthog.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CountdownComponent, TableComponent, DateHeroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ramadan-times';

  constructor(posthogService: PosthogService) {
  }
}
