import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from './currency.service';
import { Observable, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICurrency, CurrencyItem } from '../models/currency.model';

@Injectable()
export class DBService {
  private BASE_CURRENCY_URL: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  constructor(
    private currencyService: CurrencyService,
    private http: HttpClient
  ) {}

  fetchCurrency(dateFrom: string, dateTo: string): Observable<CurrencyItem[]> {
    const queryDaysString = this.convertDaysQuery(dateFrom, dateTo);
    const responceCurrencyArray = queryDaysString.map(string => this.http.get(`${this.BASE_CURRENCY_URL}&date=${string}`))
    return forkJoin(responceCurrencyArray).pipe(
        map((response: ICurrency[]) => {
        const transformedArray: ICurrency[] = response.concat(...response);
        const currencyItems: CurrencyItem[] = transformedArray.map((currencyItem: ICurrency) => {
          return new CurrencyItem(currencyItem.exchangedate, currencyItem.rate, currencyItem.cc);
        })
        return currencyItems.filter((item: CurrencyItem) => this.currencyService.getCurrencyItems().includes(item.name));
        }),
        tap((currency: CurrencyItem[]) => this.currencyService.setCurrency(currency))
    )
  }

  private convertDaysQuery(dateFrom: string, dateTo: string): string[] {
    const dateFromTimestring = new Date(dateFrom).getTime();
    const dateToTimestring = new Date(dateTo).getTime();
    const COUNTER = 1000*60*60*24;
    const daysArray: string[] = [];
    for(let start = dateFromTimestring; start <= dateToTimestring; start+=COUNTER) {
      const date = new Date(start);
      const year = date.getFullYear();
      let month = date.getMonth();
      month+=1;
      const dateOfTheMonth = date.getDate();
      daysArray.push(`${year}${month > 9 ? month : '0'+month}${dateOfTheMonth > 9 ? dateOfTheMonth : '0'+dateOfTheMonth}`)
    }
    return daysArray;
  }
}
