import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  loadingIndicatorCounter = new BehaviorSubject<number>(0);

  constructor() {}

  increaseCounter() {
    const currentValue = this.loadingIndicatorCounter.getValue();
    this.loadingIndicatorCounter.next(currentValue + 1);
  }
  decreaseCounter() {
    const currentValue = this.loadingIndicatorCounter.getValue();
    this.loadingIndicatorCounter.next(currentValue - 1);
  }
}
