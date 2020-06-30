import { createReducer, on, Action } from '@ngrx/store';
import { TotalStatisticDto } from 'src/app/shared/models/total.statistic.dto';
import { DailyStatisticDto } from 'src/app/shared/models/daily.statistic.dto';
import * as StatisticActions from '../actions/statistics.actions';

export interface State {
    total: TotalStatisticDto[];
    daily: DailyStatisticDto[];
    totalDaily: DailyStatisticDto[];
    loading: boolean;
}

const initialState: State = {
    total: [],
    daily: [],
    totalDaily: [],
    loading: true
}

export const _statisticReducer = createReducer(
    initialState,
    on(
        StatisticActions.fetchTotalSuccess, (state, { statistics }) => ({
            ...state,
            total: statistics
        })),
    on(
        StatisticActions.fetchDailySuccess, (state, { statistics }) => ({
            ...state,
            daily: statistics
        })),
    on(
        StatisticActions.fetchTotalDailySuccess, (state, { statistics }) => ({
            ...state,
            totalDaily: statistics,
            loading: false
        }))
)

export function statisticReducer(state: State | undefined, action: Action) {
    return _statisticReducer(state, action)
}