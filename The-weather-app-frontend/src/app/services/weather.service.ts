import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherData } from '../common/weather-data';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private baseUrl="http://localhost:8080/weather?lat=35.443707&lon=139.638066";

  constructor(private httpClient:HttpClient) { }

  getWeatherData(): (Observable <WeatherData>)
  {
   return this.httpClient.get<WeatherData>(this.baseUrl)

  }

}
