export class Wind {
    public get degree(): string {
        return this._degree;
    }
    public set degree(value: string) {
        this._degree = value;
    }
    public get speed(): string {
        return this._speed;
    }
    public set speed(value: string) {
        this._speed = value;
    }

    constructor(private _speed: string, private _degree: string)
    {
      
    }

}
