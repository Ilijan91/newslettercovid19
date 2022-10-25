import { LoaderService } from './services/loader.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject();
  requestCounter = 0;
  constructor(private loadingService: LoaderService) {}
  ngOnInit() {
    this.loadingService.loadingIndicatorCounter
      .pipe(delay(0), takeUntil(this.unsubscribe))
      .subscribe((resp: number) => {
        this.requestCounter = resp;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
