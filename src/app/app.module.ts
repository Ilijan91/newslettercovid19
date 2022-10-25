import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { RequestInterceptor } from './services/request.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NewsComponent,
    StatisticsComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgApexchartsModule,
    Ng2GoogleChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
