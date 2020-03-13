import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnChanges, AfterContentChecked, OnDestroy } from "@angular/core";
import { NgForm } from '@angular/forms';
import { DBService } from 'src/app/shared/db.service';
import { LoaderService } from 'src/app/shared/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-currency-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.css']
})
export class TableFiltersController implements OnInit, AfterContentChecked, OnDestroy{
  @ViewChild('dateFrom', {static: true}) dateFromEl: ElementRef;

  isLoad: boolean = false;
  maxDate: Date;
  minDate: Date;
  currentDate: Date;

  private loaderSubscription: Subscription;
  private currencySubscription: Subscription;
  constructor(
    private dbService: DBService,
    private loaderService: LoaderService
  ) {
    this.currentDate = new Date();
    this.maxDate = new Date()
  }

  ngOnInit() {
    this.isLoad = this.loaderService.getLoader();
    this.loaderSubscription = this.loaderService.loader$.subscribe((data: boolean) => {
      this.isLoad = data;
    }, (error) => {
      this.loaderService.showSnackBar(error, 'Error', 3000);
      this.loaderService.setLoader(false);
    })
  }

  onSubmit(form: NgForm): void {
    this.loaderService.setLoader(true);
    this.currencySubscription = this.dbService.fetchCurrency(form.value.dateFrom, form.value.dateTo).subscribe((data) => {
      this.loaderService.setLoader(false);
    }, (error) => {
      this.loaderService.showSnackBar(error, 'Error', 3000);
      this.loaderService.setLoader(false);
    })
  }

  ngAfterContentChecked() {
    if (this.dateFromEl.nativeElement.value) {
      this.minDate = new Date(this.dateFromEl.nativeElement.value);
      const currentDateFrom = new Date(this.dateFromEl.nativeElement.value).getTime();
      const FIVE_DAYS_LATER = 1000*60*60*24*4;
      const isCurrentDay = new Date(this.minDate).toDateString() === this.currentDate.toDateString();
      const isLessThanFive = new Date(new Date(this.minDate).getTime() + FIVE_DAYS_LATER).getTime() > this.currentDate.getTime();
      if (isCurrentDay || isLessThanFive) {
        this.maxDate = this.currentDate;
      } else {
        this.maxDate = new Date(currentDateFrom+FIVE_DAYS_LATER);
      }
    }
  }

  ngOnDestroy() {
    this.currencySubscription.unsubscribe();
    this.loaderSubscription.unsubscribe();
  }
}
