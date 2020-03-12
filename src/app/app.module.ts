import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderController } from './components/header/header.component';
import { TableController } from './components/table/table.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { TableViewController } from './components/table/view/table-view.component';
import { TableFiltersController } from './components/table/filters/table-filters.component';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyService } from './shared/currency.service';
import { DBService } from './shared/db.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderController,
    TableController,
    TableViewController,
    TableFiltersController
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [MatNativeDateModule, CurrencyService, DBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
