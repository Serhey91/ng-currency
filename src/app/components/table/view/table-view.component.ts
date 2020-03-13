import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyTableView, CurrencyItem } from 'src/app/models/currency.model';
import { CurrencyService } from 'src/app/shared/currency.service';
import { LoaderService } from 'src/app/shared/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.css']
})
export class TableViewComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['date'];
  dataSource: MatTableDataSource<CurrencyTableView>;
  isLoad = false;

  private loaderSubscription: Subscription;
  private currencySubscription: Subscription;

  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private currencyService: CurrencyService,
    private loaderService: LoaderService,
    private ref: ChangeDetectorRef,
    ) {
  }
  ngOnInit() {
    this.isLoad = this.loaderService.getLoader();
    this.loaderSubscription = this.loaderService.loader$.subscribe((data: boolean) => {
      this.isLoad = data;
      if (this.dataSource) {
        this.detectChanges();
      }
    }, (error) => {
      this.loaderService.showSnackBar(error, 'Error', 3000);
      this.loaderService.setLoader(false);
    });

    this.displayedColumns = [...this.displayedColumns, ...this.currencyService.getCurrencyItems()];
    this.currencySubscription = this.currencyService.currency$.subscribe((currency: CurrencyItem[]) => {
      this.dataSource = this.createTableView([...currency]);
      this.detectChanges();
    }, (error) => {
      this.loaderService.showSnackBar(error, 'Error', 3000);
      this.loaderService.setLoader(false);
    });
  }

  private createTableView(items: CurrencyItem[]): MatTableDataSource<CurrencyTableView> {
    const transferedItems = items.map((i: CurrencyItem) => ({date: i.date, [i.name]: i.rate}));

    const days: string[] = [...new Set(transferedItems.map(i => i.date))];

    const tableView: CurrencyTableView[] = days.map((day: string) => {
      const filteredItemsPerDay: CurrencyTableView[] = transferedItems.filter(item => item.date === day);
      return {...filteredItemsPerDay.reduce((prev: CurrencyTableView, next: CurrencyTableView) => ({...prev, ...next}), {date: ''})};
    });
    return new MatTableDataSource(tableView);
  }

  private detectChanges() {
    this.ref.detectChanges();
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.loaderSubscription.unsubscribe();
    this.currencySubscription.unsubscribe();
  }
}
