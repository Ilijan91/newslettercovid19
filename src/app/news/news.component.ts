import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { News } from '../models/news.model';
import { Portals } from '../models/portals.model';
import { NewsletterService } from '../services/newsletter.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, OnDestroy {
  allNewsArray = [];
  copyAllNewsArray = [];
  newsSource = [
    { value: 'news', viewValue: 'Unofficial news' },
    { value: 'news-official-v2', viewValue: 'Official news' },
  ];
  selectedNewsSource = this.newsSource[0].value;
  availablePortals = [];
  private unsubscribe: Subject<void> = new Subject();

  constructor(public newsletterService: NewsletterService) {}

  ngOnInit(): void {
    this.getAllNewsReport();
    this.newsletterService
      .getPortals()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (portals: Array<Portals>) => {
          if (portals && portals.length) {
            this.availablePortals = portals;
          } else {
            this.availablePortals = [];
          }
        },
        (error) => {
          this.availablePortals = [];
        }
      );
  }
  selectNewsSource(value: string) {
    this.selectedNewsSource = value;
    this.getAllNewsReport();
  }
  filterByPortal(portal: string) {
    if (portal !== 'All') {
      this.allNewsArray = this.copyAllNewsArray.filter(
        (news) => news.source.toLowerCase() === portal.toLowerCase()
      );
    } else {
      this.allNewsArray = this.copyAllNewsArray;
    }
  }
  getAllNewsReport() {
    this.allNewsArray = [];
    this.newsletterService
      .getAllNews(this.selectedNewsSource)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (response: Array<News>) => {
          if (response && response.length) {
            this.allNewsArray = response;
            this.copyAllNewsArray = response;
          } else {
            this.allNewsArray = [];
            this.copyAllNewsArray = [];
          }
        },
        (error) => {
          this.allNewsArray = [];
          this.copyAllNewsArray = [];
        }
      );
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
