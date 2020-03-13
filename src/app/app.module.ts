import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { TableController } from './components/table/table.component';
import { TableViewController } from './components/table/view/table-view.component';
import { TableFiltersController } from './components/table/filters/table-filters.component';
import { HeaderController } from './components/header/header.component';

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
    HttpClientModule,
    FormsModule,
    MaterialModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
