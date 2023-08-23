import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherData } from 'src/app/common/weather-data';
import { WeatherDetails } from 'src/app/common/weather-details';
import { WeatherService } from 'src/app/services/weather.service';
import { WeatherSummary } from 'src/app/common/weather-summary';
import { Location } from 'src/app/common/location';
import { IconNames } from 'src/app/common/icon-names';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Wind } from 'src/app/common/wind';
import { IconsNameConstants } from 'src/app/common/icons-name-constants';
import { ErrorService } from 'src/app/ErrorHanding/error-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],

})

export class WeatherComponent implements OnInit, OnDestroy {
  /**
   * Responsive対応(aspect ratio)
   */
  aspectRatio: number = 16 / 9;
  cols: number = 3;
  isSmallScreen :boolean=false;
  /**
 * APIから取得したデータを登録するようweatherDetails, location, weatherSummary, weatherData, wind の定義
 */
  weatherDetails: WeatherDetails;
  location: Location;
  weatherSummary: WeatherSummary;
  weatherData: WeatherData;
  wind: Wind;
  /**
 * APIデータの次第でアイコンを変えるようiconNames を定義 
 */
  iconNames: IconNames;
  weatherIcon: string = "";
  imageUrl: string = 'https://openweathermap.org/img/wn/02d@2x.png';
  weatherDataFetched: boolean = false;
  refreshIntervalStatus: boolean = false;
  searchTextBox = 'Yokohama';
  nextExecutionTime: number = 0; // Holds the timestamp of the next interval execution
  timeLeft: number = 0; // Holds the time left until the next execution
  errorCode$ = this.errorService.errorCode$;
  errorMessage$ = this.errorService.errorMessage$;
  private subscriptions: Subscription[] = [];

  constructor(private errorService: ErrorService, private weatherService: WeatherService, private breakpointObserver: BreakpointObserver) {
    this.weatherDetails = new WeatherDetails("", "", "", "", "", "");
    this.location = new Location("", "");
    this.weatherSummary = new WeatherSummary("", "", "", "", "");
    this.wind = new Wind("", "");
    this.weatherData = new WeatherData(this.weatherDetails, this.weatherSummary, this.location, "Placename", this.wind)
    this.iconNames = new IconNames("humidity_low");

  }
  ngOnDestroy(): void {
    // コンポネント破棄後インタバル終了
    this.weatherService.stopFetchWeatherInterval();
    this.weatherService.stopUpdateTimeInterval();
    this.subscriptions.forEach((sub) => sub.unsubscribe());

    // throw new Error('Method not implemented.');
  }

/**
 * コンポネント開始ご、レスポンシブ対応用 breakpointObserverを設定、
 */
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
        this.cols = 1;
        this.isSmallScreen =true;
        console.log("XS");
      }
      if (result.breakpoints[Breakpoints.Small]) {
        this.cols = 1;
        this.isSmallScreen =true;
        console.log("SMALL");
      }
      if (result.breakpoints[Breakpoints.Medium]) {
        this.isSmallScreen =false;
        this.cols = 1;
        console.log("Medium");
      }
      if (result.breakpoints[Breakpoints.Large]) {
        this.isSmallScreen =false;
        this.cols = 3;
        console.log("Large");
      }
      if (result.breakpoints[Breakpoints.XLarge]) {
        this.isSmallScreen =false;
        this.cols = 3;
        console.log("XLarge");
      }
    });

    // if the search button was clicked, the weather will be updated after every 10 minutes
    //  if(this.weatherDataFetched==true)
    //  {
    //   // this.weatherService.startInterval(this.getWeatherData, 10 * 60 * 1000); // 10 minutes in milliseconds

    //   this.weatherService.startInterval(this.getWeatherData, 10 * 1000); // 10 minutes in milliseconds
    //  }
    // if (this.weatherDataFetched) {
    //   console.log("processing this.weatherDataFetched");
    //   this.weatherService.startInterval(this.getWeatherData.bind(this), 10 * 1000); // 10 seconds
    // }

  }
  

  /**
   * Searchボタン押下後、WeatherServiceのAPI呼び出しを実行し、humidityのアイコンを設定、リフレッシュ対応するため２つインタバルを開始、
   */
  getWeatherData(): void {
    console.log("processing getWeatherData");
    this.weatherService.getWeatherData(this.searchTextBox).subscribe(
      (response) => {
        //データ受領のステータスはTRUEの場合
        if (response != null && response.success==true) {
          //エラーがないため画面からエラーの以前表示を消す
          this.errorService.clearError();
          this.setWeatherDataFetched();
          this.weatherData = response.data;
          this.iconNames.humidity = this.setHumidity(this.weatherData.weatherDetails.humidity);
        }
        else
        { console.log("in else 1");
      }
      },

      // (error) => {

      //   console.log("ERROR DETECTED");
      //   this.isCityNameInValid = true; // Set the error status to true when an error occurs
        
      // }


    );
  }
  /**
   * weatherDataFetchedのステータスをTRUEに設定、インタバル開始メソッド呼び出し
   */
  setWeatherDataFetched() {
    this.weatherDataFetched = true;
    this.startWeatherDataInterval();
  }
  /**
   * インタバル開始
   */
  startWeatherDataInterval() {
    // in case the user clicks on search button, when the interval is active, the interval will be cleaned, and started again
    // so that the time interval is updated
    // so that when a new city is added to the textbox, it can be searched
    if (this.weatherDataFetched) {
      //インタバルを終了する
      this.weatherService.stopUpdateTimeInterval();
      this.weatherService.stopFetchWeatherInterval();

      this.refreshIntervalStatus = true;
      this.nextExecutionTime = Date.now() + 10 * 60 * 1000; // 10 seconds in the future
      this.updateTimeLeft(); // Initial update
      //１秒ごとに動くインタバル開始
      this.weatherService.startUpdateTimeInterval(this.updateTimeLeft.bind(this), 1000); // Update every 1 second
       //１０分ごとに動くインタバル開始
      this.weatherService.startFetchWeatherInterval(this.getWeatherData.bind(this), 10 * 60 * 1000); // 5 mins
    }
  }
  /**
   * 残り時間計算しtimeLeftに登録する
   */
  updateTimeLeft() {
    console.log("updating time");
    this.timeLeft = Math.max(0, this.nextExecutionTime - Date.now());
  }

 /**
   * 時間を画面で表示できるようフォーマッ更新する
   */
  formatTime(ms: number): string {
    const minutes = Math.floor(ms / 60000); // Convert milliseconds to minutes
    const seconds = Math.floor((ms % 60000) / 1000); // Convert remaining milliseconds to seconds
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * 取得したhumidityをチェックし、humidityの値によりアイコンを設定する
   * @param {string} humidity - 取得したhumidityの値
   * @returns {IconsNameConstants} コンスタント文字列をリターン
   */
  setHumidity(humidity: string): string {
    if (parseInt(humidity) <= 40) {
      return IconsNameConstants.HUMIDITY_LOW;
    } else if (parseInt(humidity) >= 60) {
      return IconsNameConstants.HUMIDITY_HIGH;
    } else {
      return IconsNameConstants.HUMIDITY_MID;
    }
  }

   /**
   * レスポンシブ対応
   */
  calculateRowHeight() {
    const gridWidth = 700; // grid width in pixels
    return gridWidth / this.aspectRatio;
  }
}

interface CustomResponse<T> {
  success: boolean;
  errorCode: string;  
  errorMessage: string;
  data: T;
}