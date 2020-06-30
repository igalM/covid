import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/index';
import { Store } from '@ngrx/store';
import { TotalStatisticDto } from '../shared/models/total.statistic.dto';
import { DailyStatisticDto } from '../shared/models/daily.statistic.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public total$: Observable<TotalStatisticDto[]>;
  public daily$: Observable<DailyStatisticDto[]>;
  public totalDaily$: Observable<DailyStatisticDto[]>;

  // charts
  public cardColor: string = '#232837';
  public legend: boolean = true;
  public showLabels: boolean = true;
  public xAxis: boolean = true;
  public yAxis: boolean = true;
  public showYAxisLabel: boolean = true;
  public showXAxisLabel: boolean = true;

  constructor(
    private readonly store: Store<fromApp.AppState>
  ) {
    this.total$ = this.store.select(fromApp.getTotal);
    this.daily$ = this.store.select(fromApp.getDaily);
    this.totalDaily$ = this.store.select(fromApp.getTotalDaily);
  }

  ngOnInit(): void {
  }

}
