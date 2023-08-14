import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherData } from '../common/weather-data';
import { WeatherDetails } from 'src/app/common/weather-details';
import { WeatherSummary } from 'src/app/common/weather-summary';
import { Location } from 'src/app/common/location';
import { IconNames } from 'src/app/common/icon-names';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Wind } from 'src/app/common/wind';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl = "http://localhost:8080/weather?cityname=";
  weatherDetails: WeatherDetails;
  location: Location;
  weatherSummary: WeatherSummary;
  weatherData: WeatherData;
  wind: Wind;
  iconNames: IconNames;
  private intervalId: any;


  constructor(private httpClient: HttpClient, private breakpointObserver: BreakpointObserver) {
    this.weatherDetails = new WeatherDetails("", "", "", "", "", "");
    this.location = new Location("", "");
    this.weatherSummary = new WeatherSummary("", "", "", "","");
    this.wind = new Wind("", "");
    this.weatherData = new WeatherData(this.weatherDetails, this.weatherSummary, this.location, "Placename", this.wind)
    this.iconNames = new IconNames("humidity_low");



  }

  startInterval(callback: () => void, interval: number): void {
    console.log("starting interval");
    this.intervalId = setInterval(callback, interval);
  }
  stopInterval(): void {
    console.log("stopping interval");

    clearInterval(this.intervalId);
  }

  getWeatherData(searchTextBoxValue:string): (Observable<WeatherData>) {
    return this.httpClient.get<WeatherData>(this.baseUrl+searchTextBoxValue).pipe(
      map(response => {
        if (response && response != null) {
          return this.processData(response);
        }
        else { return this.weatherData; }

      }
      ));

  }

  private processData(response: WeatherData): WeatherData {
    console.log("processing data");
    const processedData = response;

    console.log(this.weatherData.weatherSummary.icon);
    processedData.weatherSummary.icon = "https://openweathermap.org/img/wn/" + processedData.weatherSummary.icon + "@2x.png";

    console.log("hi " + processedData.weatherSummary.icon);
    return processedData;
  }
}