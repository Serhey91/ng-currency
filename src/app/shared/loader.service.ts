import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoaded: boolean = false;

  loader$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private matSnackBar:MatSnackBar
  ) {
  }

  getLoader(): boolean {
    return this.isLoaded;
  }

  setLoader(newState: boolean) {
    this.isLoaded = newState;
    this.loader$.next(this.isLoaded);
  }

  showSnackBar(method, action, duration) {
    this.matSnackBar.open(method, action, {duration})
  }
}
