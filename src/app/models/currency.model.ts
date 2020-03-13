export interface ICurrency {
  r030: number;
  txt: string;
  rate: number;
  cc: string;
  exchangedate: string;
}

export class CurrencyItem {
  constructor(public date: string, public rate: number, public name: string ) {
  }
}

interface ICurrencyView {
  [key: string]: number|string;
}

export type CurrencyTableView = ICurrencyView & {date: string};
