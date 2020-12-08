/*
 * @Author: Jecyu
 * @Date: 2020-11-16 17:23:49
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-04 08:27:29
 * @FilePath: /examples/23-refactor/base/version1/src/Movie.ts
 * @Description: 
 */
class Movie {
  public static CHILDRENS = 2;
  public static REGULAR = 0;
  public static NEW_RELEASE = 1;

  private _title: string;
  private _priceCode: number;

  constructor(title: string, priceCode: number) {
    this._title = title;
    this._priceCode = priceCode;
  }

  public getPriceCode():number {
    return this._priceCode;
  }

  public setPriceCode(arg: number):void {
    this._priceCode = arg;
  }

  public getTitle():string {
    return this._title;
  }
}

export default Movie;