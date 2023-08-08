import { Component, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/common/weather-data';
import { WeatherDetails } from 'src/app/common/weather-details';
import { WeatherService } from 'src/app/services/weather.service';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NgFor, DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { WeatherSummary } from 'src/app/common/weather-summary';
import { Location } from 'src/app/common/location';
import { IconNames } from 'src/app/common/icon-names';
import {faSun,faMoon,faWind } from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Wind } from 'src/app/common/wind';
import { IconsNameConstants } from 'src/app/common/icons-name-constants';
 export interface Section {
  name: string;
  updated: Date;
}
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],

})

export class WeatherComponent implements OnInit {
  // weatherData: string ="";
  aspectRatio: number = 16 / 9; // Example aspect ratio
  cols: number = 3;
  weatherDetails: WeatherDetails;
  location: Location;
  weatherSummary: WeatherSummary;
  weatherData: WeatherData;
  wind:Wind;
  iconNames: IconNames;
  faCoffee = faWind;
  weatherIcon: string="";
  imageUrl: string = 'https://openweathermap.org/img/wn/02d@2x.png';

  constructor(private weatherService: WeatherService,private breakpointObserver: BreakpointObserver) {
    this.weatherDetails = new WeatherDetails("", "", "", "", "", "");
    this.location = new Location("", "");
    this.weatherSummary = new WeatherSummary("", "", "", "");
    this.wind=new Wind("","");
    this.weatherData = new WeatherData(this.weatherDetails, this.weatherSummary, this.location, "Placename",this.wind)
    this.iconNames=new IconNames("humidity_low");
  }
  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.breakpoints[Breakpoints.XSmall]) {
        this.cols=1;
        console.log("XS");
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.cols=1;
        console.log("SMALL");
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.cols=1;
        console.log("Medium");
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.cols=3;
        console.log("Large");
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.cols=3;
        console.log("XLarge");
      }
    });













    this.weatherService.getWeatherData().subscribe(
      (response) => {
        if (response != null) {
          this.weatherData = response;
          console.log(this.weatherData.weatherSummary.icon);
          this.weatherData.weatherSummary.icon="https://openweathermap.org/img/wn/"+this.weatherData.weatherSummary.icon+"@2x.png";
          

          if(parseInt(this.weatherData.weatherDetails.humidity)<=40)
          {
            this.iconNames.humidity=IconsNameConstants.HUMIDITY_LOW;
          }
          else if(parseInt(this.weatherData.weatherDetails.humidity)>=60)
          {
            this.iconNames.humidity=IconsNameConstants.HUMIDITY_HIGH;
          }
          else
          {
            this.iconNames.humidity=IconsNameConstants.HUMIDITY_MID;
          }
          console.log("hi " +this.weatherData.weatherSummary.icon);
        }
      });
    console.log("hi " +this.weatherData.weatherSummary.icon);



  }
  calculateRowHeight() {
    const gridWidth = 700; // Example grid width in pixels
    return gridWidth / this.aspectRatio;
  }
}