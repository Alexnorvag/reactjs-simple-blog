/* eslint-disable no-param-reassign */

import { ActionReducerMapBuilder, CaseReducer } from '@reduxjs/toolkit';
import { loadingStatuses, LoadingStatuses, statusesToThunkMapping } from '../constants/api';

type ReducerKey = any;
type ReducerState = any;
type ExtraReducer = CaseReducer<any, ReturnType<any>> | CaseReducer<any, any>;
type ReducerConfig = [ReducerKey, ExtraReducer];
type WithLoading<S> = S & { loading: LoadingStatuses };

export type ExtraReducersConfig = ReducerConfig[];

/**
 * Adapting the multidimensional array to the extraReducers
 * The cause of the array usage is AsyncThunk cannot be used as an object key
 * @param extraReducers
 */
export const extraReducersAdapter = <State>(extraReducers: ExtraReducersConfig) => (
  builder: ActionReducerMapBuilder<State>,
) => extraReducers.forEach(
  (reducerConfig: ReducerConfig) => builder.addCase(reducerConfig[0], reducerConfig[1]),
);

/**
 * Builds extra reducers config for handling default loading statuses
 * The second argument can be used to specify specific statuses (LoadingStatuses) as an array
 * The third argument can be used for selecting where status should be written
 * @param actionCreator
 * @param statuses
 * @param pathSelector
 */
export const handleDefaultLoadingStatuses = (
  actionCreator: any,
  statuses: LoadingStatuses[] = Object.values(loadingStatuses),
  pathSelector?: (reducerState: ReducerState) => WithLoading<ReducerState>,
): ExtraReducersConfig => statuses.map(
  (status: LoadingStatuses): [ReducerKey, ExtraReducer] => [
    actionCreator[statusesToThunkMapping[status]],
    (reducerState: ReducerState): void => {
      const targetState: WithLoading<ReducerState> = pathSelector
        ? pathSelector(reducerState)
        : reducerState;

      targetState.loading = status;
    },
  ],
);
