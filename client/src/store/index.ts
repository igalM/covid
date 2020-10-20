import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStatistic from './reducers/statistics.reducer';

export interface AppState {
    statistics: fromStatistic.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    statistics: fromStatistic.statisticReducer,
}

export const selectStatisticState = createFeatureSelector<fromStatistic.State>('statistics');

export const getTotal = createSelector(
    selectStatisticState,
    (state: fromStatistic.State) => state.total
);

export const getDaily = createSelector(
    selectStatisticState,
    (state: fromStatistic.State) => state.daily
);

export const getTotalDaily = createSelector(
    selectStatisticState,
    (state: fromStatistic.State) => state.totalDaily
);

export const getLoadingState = createSelector(
    selectStatisticState,
    (state: fromStatistic.State) => state.loading
);
