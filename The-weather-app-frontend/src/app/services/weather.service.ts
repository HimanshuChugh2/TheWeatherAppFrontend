import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { WeatherData } from '../common/weather-data';
import { WeatherDetails } from 'src/app/common/weather-details';
import { WeatherSummary } from 'src/app/common/weather-summary';
import { Location } from 'src/app/common/location';
import { Wind } from 'src/app/common/wind';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
/**
 * getWeatherByCityNameUrl is used to call API to get weather data by Cityname 
 */
  private getWeatherByCityNameUrl = "http://localhost:8080/weather?cityname=";

/**
 * APIから取得したデータを登録するようweatherDetails, location, weatherSummary, weatherData, wind の定義
 */
  weatherDetails: WeatherDetails;
  location: Location;
  weatherSummary: WeatherSummary;
  weatherData: WeatherData;
  wind: Wind;
 /**
 * 定期的にAPI呼び出し、Weatherのデータを更新するためintervalIdを定義
 */
  private intervalIdUpdateTime: any;
  private intervalIdFetchWeather: any;

  /**
 * 画面リフレッシュの残り時間計算のためのインタバル開始するメソッド
 */
  startUpdateTimeInterval(callback: () => void, interval: number): void {
    console.log("starting startUpdateTimeInterval");
    this.intervalIdUpdateTime = setInterval(callback, interval);
  }
  /**
 * 定期的にAPI呼び出すためのインタバル開始するメソッド
 */
  startFetchWeatherInterval(callback: () => void, interval: number): void {
    console.log("starting startFetchWeatherInterval");
    this.intervalIdFetchWeather = setInterval(callback, interval);
  }
  /**
 * 画面リフレッシュの残り時間計算のためのインタバル終了するメソッド
 */
  stopUpdateTimeInterval(): void {
    console.log("stopping stopUpdateTimeInterval");
    clearInterval(this.intervalIdUpdateTime);
  }
  /**
 * 定期的にAPI呼び出すためのインタバル終了するメソッド
 */
  stopFetchWeatherInterval(): void {
    console.log("stopping stopFetchWeatherInterval");
    clearInterval(this.intervalIdFetchWeather);
  }

   /**
 * 定義したフィールドの初期化。初期画面で表示されるデータを設定。
 */
  constructor(private httpClient: HttpClient) {
    this.weatherDetails = new WeatherDetails("", "", "", "", "", "");
    this.location = new Location("", "");
    this.weatherSummary = new WeatherSummary("", "", "", "","");
    this.wind = new Wind("", "");
    this.weatherData = new WeatherData(this.weatherDetails, this.weatherSummary, this.location, "", this.wind)

  }

/**
 * データ取得のためAPI呼び出し
 * @param {string} searchTextBoxValue - 画面上で入力した市名
 * @returns {WeatherData} 取得したデータをWeatherDataに登録しリターンする
 */
  getWeatherData(searchTextBoxValue:string): (Observable<CustomResponse<WeatherData>>) {
    return this.httpClient.get<CustomResponse<WeatherData>>(this.getWeatherByCityNameUrl+searchTextBoxValue).pipe(
      map(response => {
        if (response && response != null) { 
          // i haave defined a new custom response entity class in spring side. and i am able to receive dat from that class to the angular app. I have also defined error-intercepter in angular side. it detects all api calls and wht response they gave. accordingly now i have to show popup when error occurs.
         
          const weatherData: WeatherData =this.processData(response.data);
          response.data=weatherData;
          return response;
        }
        else { return response; }

      }
      ));
}
/**
 * 取得したデータをWeatherDataに登録、取得した天気の写真のURLを作成。
 * @param {WeatherData} response - APIで取得したデータ
 * @returns {WeatherData} 取得したデータをWeatherDataに登録しリターンする
 */
  private processData(response: WeatherData): WeatherData {
    console.log("processing data");
    const processedData = response;
    processedData.weatherSummary.icon = "https://openweathermap.org/img/wn/" + processedData.weatherSummary.icon + "@2x.png";
    return processedData;
  }
}

interface CustomResponse<T> {
  success: boolean;
  errorCode: string;  
  errorMessage: string;
  data: T;
}