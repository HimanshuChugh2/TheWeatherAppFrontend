import { Component, OnDestroy, OnInit } from '@angular/core';
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

export class WeatherComponent implements OnInit, OnDestroy {
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
  weatherDataFetched:boolean=false;
  refreshIntervalStatus:boolean=false;
  searchTextBox = 'Yokohama';
  nextExecutionTime: number=0; // Holds the timestamp of the next interval execution
  timeLeft: number=0; // Holds the time left until the next execution
  constructor(private weatherService: WeatherService,private breakpointObserver: BreakpointObserver) {
    this.weatherDetails = new WeatherDetails("", "", "", "", "", "");
    this.location = new Location("", "");
    this.weatherSummary = new WeatherSummary("", "", "", "","");
    this.wind=new Wind("","");
    this.weatherData = new WeatherData(this.weatherDetails, this.weatherSummary, this.location, "Placename",this.wind)
    this.iconNames=new IconNames("humidity_low");

  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
  ngOnInit(): void {
    console.log("processing ngOnInit");

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
 
  // if the search button was clicked, the weather will be updated after every 10 minutes
  //  if(this.weatherDataFetched==true)
  //  {
  //   // this.weatherService.startInterval(this.getWeatherData, 10 * 60 * 1000); // 10 minutes in milliseconds
    
  //   this.weatherService.startInterval(this.getWeatherData, 10 * 1000); // 10 minutes in milliseconds
  //  }
  console.log("this.weatherDataFetched "+this.weatherDataFetched);
  // if (this.weatherDataFetched) {
  //   console.log("processing this.weatherDataFetched");
  //   this.weatherService.startInterval(this.getWeatherData.bind(this), 10 * 1000); // 10 seconds
  // }

  }
  setWeatherDataFetched() {
    this.weatherDataFetched = true;
    this.startWeatherDataInterval();
  }
  // checking if the session is not already started, if yes, then skip, if no then start.
  // 
  startWeatherDataInterval() {
    // in case the user clicks on search button, when the interval is active, the interval will be cleaned, and started again
    // so that the time interval is updated
    // so that when a new city is added to the textbox, it can be searched
    if (this.weatherDataFetched) {
      this.weatherService.stopInterval();
      this.refreshIntervalStatus=true;
      this.nextExecutionTime = Date.now() + 10 * 60 * 1000; // 10 seconds in the future
      this.updateTimeLeft(); // Initial update
      this.weatherService.startInterval(this.updateTimeLeft.bind(this), 1000); // Update every 1 second
      this.weatherService.startInterval(this.getWeatherData.bind(this), 10 * 60 * 1000); // 5 mins
    }
  }
  updateTimeLeft() {
    this.timeLeft = Math.max(0, this.nextExecutionTime - Date.now());
  }
  formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000); // Convert milliseconds to minutes
    const seconds = Math.floor((ms % 60000) / 1000); // Convert remaining milliseconds to seconds
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
  getWeatherData(): void {
    console.log("processing getWeatherData");

    this.weatherService.getWeatherData(this.searchTextBox).subscribe(
      (response) => {
        if (response != null) {
          this.setWeatherDataFetched();
          this.weatherData = response;

          if (parseInt(this.weatherData.weatherDetails.humidity) <= 40) {
            this.iconNames.humidity = IconsNameConstants.HUMIDITY_LOW;
          } else if (parseInt(this.weatherData.weatherDetails.humidity) >= 60) {
            this.iconNames.humidity = IconsNameConstants.HUMIDITY_HIGH;
          } else {
            this.iconNames.humidity = IconsNameConstants.HUMIDITY_MID;
          }
        }
      }
    );
  }
  


  calculateRowHeight() {
    const gridWidth = 700; // Example grid width in pixels
    return gridWidth / this.aspectRatio;
  }

 
}