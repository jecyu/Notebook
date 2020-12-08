/*
 * @Author: Jecyu
 * @Date: 2020-11-17 10:13:43
 * @LastEditors: Jecyu
 * @LastEditTime: 2020-12-07 09:46:18
 * @FilePath: /examples/23-refactor/base/version1.0.4/src/Rental.ts
 * @Description: 租单
 */
import Movie from "./Movie";
class Rental {
  private _movie: Movie;
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

  public getCharge(): number {
    let result: number = 0;
    switch (this.getMovie().getPriceCode()) {
      case Movie.REGULAR:
        result += 2;
        if (this.getDaysRented() > 2) {
          result += (this.getDaysRented() - 2) * 1.5;
        }
        break;
      case Movie.NEW_RELEASE:
        result += this.getDaysRented() * 3;
        break;
      case Movie.CHILDRENS:
        result += 1.5;
        if (this.getDaysRented() > 3) {
          result += (this.getDaysRented() - 3) * 1.5;
        }
        break;
    }
    return result;
  }

  // Refactor 新增 getFrequentRenterPoints
  public getFrequentRenterPoints() {
    // add bonus for a two day new release rental
    if (
      this.getMovie().getPriceCode() === Movie.NEW_RELEASE &&
      this.getDaysRented() > 1
    ) {
      return 2;
    }
    return 1;
  }
}

export default Rental;
