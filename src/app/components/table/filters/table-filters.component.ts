import { Component, ElementRef, ViewChild, OnInit, AfterViewInit, OnChanges, AfterContentChecked } from "@angular/core";
import { NgForm } from '@angular/forms';
import { DBService } from 'src/app/shared/db.service';

@Component({
  selector: 'app-currency-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.css']
})
export class TableFiltersController implements OnInit, AfterContentChecked{
  @ViewChild('dateFrom', {static: true}) dateFromEl: ElementRef;

  isLoading: boolean = false;
  maxDate: Date;
  minDate: Date;
  currentDate: Date;
  constructor(
    private dbService: DBService
  ) {
    this.currentDate = new Date();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm): void {
    this.isLoading = true;
    this.dbService.fetchCurrency().subscribe((data) => {
      console.log(data);
      this.isLoading = false;
    })
  }

  ngAfterContentChecked() {
    // TODO - think about days in the future
    if (this.dateFromEl.nativeElement.value) {
      this.minDate = new Date(this.dateFromEl.nativeElement.value);
      const currentDateFrom = new Date(this.dateFromEl.nativeElement.value).getTime();
      const FIVE_DAYS_LATER = 1000*60*60*24*4;
      this.maxDate = new Date(currentDateFrom+FIVE_DAYS_LATER);
    }
  }
}
