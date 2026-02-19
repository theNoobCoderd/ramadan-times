import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {CountdownComponent} from './components/countdown/countdown.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CountdownComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ramadan-times';
}
