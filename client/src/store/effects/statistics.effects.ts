import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, concatMap } from 'rxjs/operators';
import { StatisticsService } from 'src/app/shared/services/statistics.service';
import * as StatisticsActions from '../actions/statistics.actions';
import { TotalStatisticDto } from 'src/app/shared/models/total.statistic.dto';
import { DailyStatisticDto } from 'src/app/shared/models/daily.statistic.dto';
import { combineLatest } from 'rxjs';

@Injectable()
export class StatisticsEffects {

    public total: TotalStatisticDto[] = [];
    public daily: DailyStatisticDto[] = [];
    public dailyTotal: DailyStatisticDto[] = [];

    getStatistics$ = createEffect(() => this.actions$.pipe(
        ofType(StatisticsActions.fetchTotal),
        switchMap(() => {
            const total$ = this.statisticsService.getTotal();
            const daily$ = this.statisticsService.getDaily();
            const totalDaily$ = this.statisticsService.getTotalDaily();
            return combineLatest([total$, daily$, totalDaily$]);
        }),
        concatMap(([total, daily, totalDaily]) => [
            StatisticsActions.fetchTotalSuccess({ statistics: total }),
            StatisticsActions.fetchDailySuccess({ statistics: daily }),
            StatisticsActions.fetchTotalDailySuccess({ statistics: totalDaily })
        ])));

    constructor(
        private readonly actions$: Actions,
        private readonly statisticsService: StatisticsService
    ) { }

}