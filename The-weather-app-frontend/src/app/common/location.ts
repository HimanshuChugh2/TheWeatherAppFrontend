  /**
   * 受領データのLocationに当てはまるDTOクラス
   */

export class Location {
    constructor(private _latitude: string,
        private _longitude: string){
        }

    public get longitude(): string {
        return this._longitude;
    }
    public set longitude(value: string) {
        this._longitude = value;
    }
    public get latitude(): string {
        return this._latitude;
    }
    public set latitude(value: string) {
        this._latitude = value;
    }
    
}
