import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public spinnerCounter = 0;
  public spinnerCounterBehavior: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  showSpinner() {
    this.spinnerCounter++;
    this.spinnerCounterBehavior.next(this.spinnerCounter);
    console.log("spinnerCounter", this.spinnerCounter);
  }

  hideSpinner() {
    this.spinnerCounter--;
    this.spinnerCounterBehavior.next(this.spinnerCounter);
    console.log("spinnerCounter", this.spinnerCounter);
  }

  constructor() { }
}
