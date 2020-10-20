import { createAction, props } from '@ngrx/store';
import { TotalStatisticDto } from 'src/app/shared/models/total.statistic.dto';
import { DailyStatisticDto } from 'src/app/shared/models/daily.statistic.dto';

export const fetchTotal = createAction('[Statistics] Fetch Total Statistics');

export const fetchTotalSuccess = createAction(
    '[Statistics] Fetch Total Statistics Success',
    props<{ statistics: TotalStatisticDto[] }>()
);

export const fetchDailySuccess = createAction(
    '[Statistics] Fetch Daily Statistics Success',
    props<{ statistics: DailyStatisticDto[] }>()
);

export const fetchTotalDailySuccess = createAction(
    '[Statistics] Fetch Total Daily Statistics Success',
    props<{ statistics: DailyStatisticDto[] }>()
);