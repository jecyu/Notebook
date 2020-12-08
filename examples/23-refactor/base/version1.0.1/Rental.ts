
/*
* @Author: Jecyu
* @Date: 2020-11-17 10:13:43
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-11-18 08:25:40
 * @FilePath: /examples/23-refactor/base/version1/src/Rental.ts
* @Description: 租单
*/
import Movie from "./Movie";
class Rental {
  private _movie:Movie;
  private _daysRented: number;

  constructor(moive: Movie, daysRented: number) {
    this._movie = moive;
    this._daysRented = daysRented;
  }

  public getDaysRented(): number {
    return this._daysRented;
  }

  public getMovie(): Movie {
    return this._movie;
  }
}

export default Rental;