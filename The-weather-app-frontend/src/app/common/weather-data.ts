  /**
   * 受領データのWeatherDataに当てはまるDTOクラス
   */
import { Location } from "./location";
import { WeatherDetails } from "./weather-details";
import { WeatherSummary } from "./weather-summary";
import { Wind } from "./wind";

export class WeatherData {
    private _weatherSummary: WeatherSummary;
    private _weatherDetails: WeatherDetails;
    private _location: Location;
    private _placeName: string;
    private _wind: Wind;
    public get wind(): Wind {
        return this._wind;
    }
    public set wind(value: Wind) {
        this._wind = value;
    }
    constructor(_weatherDetails: WeatherDetails,
        _weatherSummary: WeatherSummary, 
        _location: Location,
        _placeName: string,
        _wind:Wind){
this._location=_location;
this._placeName=_placeName;
this._weatherDetails=_weatherDetails;
this._weatherSummary=_weatherSummary;
this._wind=_wind;
        }
        
    public get placeName(): string {
        return this._placeName;
    }
    public set placeName(value: string) {
        this._placeName = value;
    }
    public get location(): Location {
        return this._location;
    }
    public set location(value: Location) {
        this._location = value;
    }
    public get weatherSummary(): WeatherSummary {
        return this._weatherSummary;
    }
    public set weatherSummary(value: WeatherSummary) {
        this._weatherSummary = value;
    }
    public get weatherDetails(): WeatherDetails {
        return this._weatherDetails;
    }
    public set weatherDetails(value: WeatherDetails) {
        this._weatherDetails = value;
    }
    
}
