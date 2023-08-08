export class WeatherDetails {
    constructor(private _temperature: string,
        private _feelsLike: string,
        private _temperatureMin: string,
        private _temperatureMax: string,
        private _pressure: string,
        private _humidity: string){
            this._temperature=_temperature;
            this._feelsLike=_feelsLike;
            this.temperatureMin=_temperatureMin;
            this.temperatureMax=_temperatureMax;
            this.pressure=_pressure;
            this.humidity=_humidity;
        }
    public get humidity(): string {
        return this._humidity;
    }
    public set humidity(value: string) {
        this._humidity = value;
    }
    public get pressure(): string {
        return this._pressure;
    }
    public set pressure(value: string) {
        this._pressure = value;
    }
    public get temperatureMax(): string {
        return this._temperatureMax;
    }
    public set temperatureMax(value: string) {
        this._temperatureMax = value;
    }
    public get temperatureMin(): string {
        return this._temperatureMin;
    }
    public set temperatureMin(value: string) {
        this._temperatureMin = value;
    }
    public get feelsLike(): string {
        return this._feelsLike;
    }
    public set feelsLike(value: string) {
        this._feelsLike = value;
    }
    public get temperature(): string {
        return this._temperature;
    }
    public set temperature(value: string) {
        this._temperature = value;
    }


}
