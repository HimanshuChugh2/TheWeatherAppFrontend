//  import { Component, OnInit } from '@angular/core';
// import { WeatherData } from 'src/app/common/weather-data';
// import { WeatherDetails } from 'src/app/common/weather-details';
// import { WeatherService } from 'src/app/services/weather.service';
// import { MatDividerModule } from '@angular/material/divider';
// import { MatIconModule } from '@angular/material/icon';
// import { NgFor, DatePipe } from '@angular/common';
// import { MatListModule } from '@angular/material/list';
// import { WeatherSummary } from 'src/app/common/weather-summary';
// import { Location } from 'src/app/common/location';
// import { IconNames } from 'src/app/common/icon-names';
// import {faSun,faMoon,faWind } from '@fortawesome/free-solid-svg-icons';
// import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
// import { Wind } from 'src/app/common/wind';
// import { IconsNameConstants } from 'src/app/common/icons-name-constants';
// import { icon } from '@fortawesome/fontawesome-svg-core';
// @Component({
//   selector: 'app-search-fields',
//   templateUrl: './search-fields.component.html',
//   styleUrls: ['./search-fields.component.css']
// })
// export class SearchFieldsComponent {
//   weatherDetails: WeatherDetails;
//   location: Location;
//   weatherSummary: WeatherSummary;
//   weatherData: WeatherData;
//   wind:Wind;
//   iconNames: IconNames;
//   imageUrl: string = 'https://openweathermap.org/img/wn/02d@2x.png';
//   weatherDataFetched:boolean=false;
//   constructor(private weatherService: WeatherService,private breakpointObserver: BreakpointObserver) {
//     this.weatherDetails = new WeatherDetails("", "", "", "", "", "");
//     this.location = new Location("", "");
//     this.weatherSummary = new WeatherSummary("", "", "", "");
//     this.wind=new Wind("","");
//     this.weatherData = new WeatherData(this.weatherDetails, this.weatherSummary, this.location, "Placename",this.wind)
//     this.iconNames=new IconNames("humidity_low");
//   }

//   getWeatherData(): void {
//     this.weatherService.getWeatherData().subscribe(
//       (response) => {
//         if (response != null) {
//           this.weatherDataFetched = true;
//           this.weatherData = response;
//           console.log(this.weatherData.weatherSummary.icon);
//           this.weatherData.weatherSummary.icon =response.weatherSummary.icon;
  
//           if (parseInt(this.weatherData.weatherDetails.humidity) <= 40) {
//             this.iconNames.humidity = IconsNameConstants.HUMIDITY_LOW;
//           } else if (parseInt(this.weatherData.weatherDetails.humidity) >= 60) {
//             this.iconNames.humidity = IconsNameConstants.HUMIDITY_HIGH;
//           } else {
//             this.iconNames.humidity = IconsNameConstants.HUMIDITY_MID;
//           }
//           console.log("hi " + this.weatherData.weatherSummary.icon);
//         }
//       }
//     );
//   }
// }
