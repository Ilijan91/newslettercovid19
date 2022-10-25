import { StatisticsComponent } from './statistics/statistics.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news/news.component';

const routes: Routes = [
  { path: 'news', component: NewsComponent, pathMatch: 'full' },
  { path: 'statistics', component: StatisticsComponent, pathMatch: 'full' },
  { path: '**', component: NewsComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
