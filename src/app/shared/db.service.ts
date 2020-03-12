import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { CurrencyService } from './currency.service';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ICurrency, CurrencyItem } from '../models/currency.model';

@Injectable()
export class DBService {
  private BASE_CURRENCY_URL: string = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
  private EXPECTED_CURRENCY: string[] = ['EUR', 'USD', 'GBP'];
  constructor(
    private currencyService: CurrencyService,
    private http: HttpClient
  ) {}

  fetchCurrency(): Observable<CurrencyItem[]> {
    return this.http.get(this.BASE_CURRENCY_URL)
      .pipe(
        map((response: ICurrency[]) => {
        return response.map((currencyItem: ICurrency) => {
          return new CurrencyItem(currencyItem.exchangedate, currencyItem.rate, currencyItem.cc);
        })
        }),
        // TODO finish filtering
        filter(item => this.EXPECTED_CURRENCY.includes(item.name))
    )
  }
}
