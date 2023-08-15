import { Component,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./custom.style.css'],
  // encapsulation:ViewEncapsulation.None,
})
export class AppComponent {
  title = 'The-weather-app-frontend';
}
