export class WeatherSummary {

    constructor(private _id: string,
        private _main: string,
        private _description: string,
        private _icon: string,
        private _country: string)
        {}
    public get icon(): string {
        return this._icon;
    }
    public set icon(value: string) {
        this._icon = value;
    }
    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get main(): string {
        return this._main;
    }
    public set main(value: string) {
        this._main = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get country(): string {
        return this._country;
    }
    public set country(value: string) {
        this._country = value;
    }
}
