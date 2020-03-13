import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from './currency.service';
import { Observable, forkJoin } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { ICurrency, CurrencyItem } from '../models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class DBService {
  private BASE_CURRENCY_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';

  constructor(
    private currencyService: CurrencyService,
    private http: HttpClient
  ) {}

  fetchCurrency(dateFrom: string, dateTo: string): Observable<CurrencyItem[]> {
    const queryDaysString: string[] = this.convertDaysQuery(dateFrom, dateTo);

    return forkJoin(this.fetchRequests(queryDaysString)).pipe(
        map((response: ICurrency[]) => this.transformCurrency(response)),
        tap((currency: CurrencyItem[]) => this.currencyService.setCurrency(currency)),
        catchError(err => { throw err.message; }),
    );
  }

  private transformCurrency(response: ICurrency[]): CurrencyItem[] {
    const transformedArray: ICurrency[] = response.concat(...response);

    const currencyItems: CurrencyItem[] = transformedArray
      .map(({exchangedate, rate, cc}: ICurrency) => new CurrencyItem(exchangedate, rate, cc));

    return currencyItems
      .filter(({name}: CurrencyItem) => this.currencyService.getCurrencyItems().includes(name));
  }

  private fetchRequests(query: string[]): Observable<object>[] {
    return query.map((str: string) => this.http.get(`${this.BASE_CURRENCY_URL}&date=${str}`));
  }

  private convertDaysQuery(dateFrom: string, dateTo: string): string[] {
    const dateFromTimestring = new Date(dateFrom).getTime();
    const dateToTimestring = new Date(dateTo).getTime();
    const COUNTER_FOR_DAY = 1000 * 60 * 60 * 24;
    const daysArray: string[] = [];
    for (let start = dateFromTimestring; start <= dateToTimestring; start += COUNTER_FOR_DAY) {
      const date = new Date(start);
      const year = date.getFullYear();
      let month = date.getMonth();
      month += 1;
      const dateOfTheMonth = date.getDate();
      daysArray.push(`${year}${month > 9 ? month : '0' + month}${dateOfTheMonth > 9 ? dateOfTheMonth : '0' + dateOfTheMonth}`);
    }
    return daysArray;
  }
}
