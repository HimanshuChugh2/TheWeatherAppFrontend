export class IconNames {
    // public get description(): string {
    //     return this._description;
    // }
    // public set description(value: string) {
    //     this._description = value;
    // }
    // public get main(): string {
    //     return this._main;
    // }
    // public set main(value: string) {
    //     this._main = value;
    // }
    // public get feelsLike(): string {
    //     return this._feelsLike;
    // }
    // public set feelsLike(value: string) {
    //     this._feelsLike = value;
    // }
    constructor(private _humidity: string)
    {
 
    
    }
    public get humidity(): string {
        return this._humidity;
    }
    public set humidity(value: string) {
        this._humidity = value;
    }
    // public get temperature(): string {
    //     return this._temperature;
    // }
    // public set temperature(value: string) {
    //     this._temperature = value;
    // }
    


}
