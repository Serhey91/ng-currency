import { Injectable } from "@angular/core";
import { ICurrency, CurrencyItem } from '../models/currency.model';
import { Subject } from 'rxjs';

@Injectable()
export class CurrencyService {
  private localCurrency: CurrencyItem[];
  private EXPECTED_CURRENCY: string[] = ['EUR', 'USD', 'GBP'];
  currencySubject: Subject<CurrencyItem[]> = new Subject<CurrencyItem[]>()

  constructor() {}

  getCurrency():CurrencyItem[] {
    return [...this.localCurrency];
  }

  setCurrency(currencyArray: CurrencyItem[]): void {
    this.localCurrency = currencyArray;
    this.currencySubject.next([...this.localCurrency]);
  }

  getCurrencyItems(): string[] {
    return [...this.EXPECTED_CURRENCY];
  }
}
