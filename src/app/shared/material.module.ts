import { NgModule } from "@angular/core";
import {
  MatToolbarModule,
  MatSortModule,
  MatTableModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatInputModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
  } from '@angular/material';

@NgModule({
  imports: [
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  exports: [
    MatToolbarModule,
    MatSortModule,
    MatTableModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  providers: [MatNativeDateModule]
})

export class MaterialModule {

}
