  /**
   * 画面表示用項目のアイコンをデータ次第で買えるように使うクラス
   * 項目の値をゲット・セットする
   */
export class IconNames {

    constructor(private _humidity: string)
    { }
    public get humidity(): string {
        return this._humidity;
    }
    public set humidity(value: string) {
        this._humidity = value;
    }
}
