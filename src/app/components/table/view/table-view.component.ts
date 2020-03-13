import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyTableView, CurrencyItem } from 'src/app/models/currency.model';
import { CurrencyService } from 'src/app/shared/currency.service';

@Component({
  selector: 'app-currency-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewController implements OnInit{

  displayedColumns: string[] = ['date'];
  dataSource: CurrencyTableView[];
  // todo add subscription and onDestroy

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private currencyService: CurrencyService) {

  }
  ngOnInit() {
    this.displayedColumns = [...this.displayedColumns, ...this.currencyService.getCurrencyItems()];
    this.currencyService.currencySubject.subscribe((currency: CurrencyItem[]) => {
      this.dataSource = this.createTableView([...currency]);
    })
    // this.dataSource.sort = this.sort;
  }

  private createTableView(items: CurrencyItem[]): CurrencyTableView[] {
    const transferedItems = items.map((i:CurrencyItem) => ({date: i.date, [i.name]: i.rate}));
    const days: string[] = [...new Set(transferedItems.map(i => i.date))];
    const tableView: CurrencyTableView[] = days.map((day:string) => {
      const filteredItemsPerDay: CurrencyTableView[] = transferedItems.filter(item => item.date === day);
      return {...filteredItemsPerDay.reduce((prev: CurrencyTableView, next: CurrencyTableView) => ({...prev, ...next}), {date: ''})}
    })
    console.log(tableView);
    return tableView;
    // const currencyFIlters = this.currencyService.getCurrencyItems();
//     0: CurrencyItem {date: "13.03.2020", rate: 32.7466, name: "GBP"}
// 1: CurrencyItem {date: "13.03.2020", rate: 25.858, name: "USD"}
// 2: CurrencyItem {date: "13.03.2020", rate: 29.054, name: "EUR"}
    // return currencyFIlters.map((currencyName: string) => {
    //   return {
    //     [currencyName]: items.filter((c: CurrencyItem) => c.name === currencyName)
    //   }
    // })
  }
}
