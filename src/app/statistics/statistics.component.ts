import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
} from 'ng-apexcharts';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Statistics, Stats } from '../models/statistics.model';
import { NewsletterService } from '../services/newsletter.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<any>;
  private unsubscribe: Subject<void> = new Subject();
  chartInfo: any;
  allHistory: Array<any>;
  public lineCompareChart: GoogleChartInterface = {
    chartType: GoogleChartType.LineChart,
    dataTable: null,
    options: {
      title: 'Number of covid19 cases/deaths by day',
      curveType: 'function',
      legend: { position: 'bottom' },
      width: '100%',
      height: 600,
    },
  };
  public areaCasesChart: GoogleChartInterface = {
    chartType: GoogleChartType.AreaChart,
    dataTable: null,
    options: {
      title: 'Total covid19 cases per day',
      hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
      legend: { position: 'bottom' },
      width: '100%',
      height: 600,
      tooltip: { isHtml: true },
    },
  };
  public columnDeathsChart: GoogleChartInterface = {
    chartType: GoogleChartType.ColumnChart,
    dataTable: null,
    options: {
      title: 'Total covid19 deaths per day',
      hAxis: { title: 'Date', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
      legend: { position: 'bottom' },
      width: '100%',
      height: 600,
      tooltip: { isHtml: true, style: { width: '200px' } },
    },
  };
  constructor(public newsletterService: NewsletterService) {}

  ngOnInit(): void {
    this.newsletterService
      .getStatistics()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (stats: Statistics) => {
          if (
            stats &&
            stats.response &&
            stats.response.length &&
            stats.results > 0
          ) {
            this.chartInfo = {
              date: stats.response[0].day,
              country: stats.response[0].country,
              population: stats.response[0].population,
            };
            this.chartOptions = {
              tooltip: {
                enabled: true,
                followCursor: true,
                y: {
                  formatter: undefined,
                  title: {
                    formatter: (value) => {
                      return this.getStatsValues(
                        stats.response[0][value.toLowerCase()]
                      );
                    },
                  },
                },
                marker: {
                  show: true,
                },
              },
              series: [
                stats.response[0].cases.total,
                stats.response[0].deaths.total,
                stats.response[0].tests.total,
              ],
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: ['Cases', 'Deaths', 'Tests'],
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    chart: {
                      width: 200,
                    },
                    legend: {
                      position: 'bottom',
                    },
                  },
                },
              ],
            };
          } else {
            this.chartInfo = null;
          }
        },
        (error) => {
          this.chartInfo = null;
        }
      );

    this.newsletterService
      .getHistoryStats()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(
        (historyStats: Statistics) => {
          if (
            historyStats &&
            historyStats.response &&
            historyStats.response.length
          ) {
            this.allHistory = this.removeDuplicateRecords(
              historyStats.response
            );
            this.drawChart(
              [['Day', 'Deaths', 'Cases']],
              this.allHistory,
              'lineCompareChart'
            );
            this.drawChart(
              [
                [
                  'Day',
                  'Cases',
                  {
                    type: 'string',
                    label: 'Tooltip Chart',
                    role: 'tooltip',
                    p: { html: true },
                  },
                ],
              ],
              this.allHistory,
              'areaCasesChart'
            );
            this.drawChart(
              [
                [
                  'Day',
                  'Deaths',
                  {
                    type: 'string',
                    label: 'Tooltip Chart',
                    role: 'tooltip',
                    p: { html: true },
                  },
                ],
              ],
              this.allHistory,
              'columnDeathsChart'
            );
          } else {
            this.allHistory = [];
          }
        },
        (error) => {
          this.allHistory = [];
        }
      );
  }
  drawChart(firstRowLabels: Array<Array<any>>, data: any, chart: string) {
    this[chart].dataTable = firstRowLabels;
    switch (chart) {
      case 'areaCasesChart':
        data.map((element) =>
          this[chart].dataTable.push([
            element.day,
            element.cases.total,
            this.getStatsValues(element.cases),
          ])
        );
        break;
      case 'columnDeathsChart':
        data.map((element) =>
          this[chart].dataTable.push([
            element.day,
            element.deaths.total,
            this.getStatsValues(element.deaths),
          ])
        );
        break;
      default:
        data.map((element) =>
          this[chart].dataTable.push([
            element.day,
            element.deaths.total,
            element.cases.total,
          ])
        );
    }
  }

  removeDuplicateRecords(arrayObj: Array<Stats>) {
    return arrayObj.filter(
      (value, index, self) =>
        index === self.findIndex((x) => x.day === value.day)
    );
  }
  getStatsValues(values: any) {
    const labelsValue = [];
    for (const [key, value] of Object.entries(values)) {
      labelsValue.push(`${key}: ${value}<br>`);
    }
    return labelsValue.join(' ');
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
