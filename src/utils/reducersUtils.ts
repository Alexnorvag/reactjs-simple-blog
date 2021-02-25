/* eslint-disable no-param-reassign */

import { ActionReducerMapBuilder, CaseReducer } from '@reduxjs/toolkit';
import {
  requestStatuses,
  RequestStatus,
  statusesToThunkMapping,
  RequestStatusCode,
  requestStatusCodes,
} from '../constants/api';
import { getStatusCode } from './axiosErrorsUtils';

const statusCodes: RequestStatusCode[] = Object.values(requestStatusCodes);

export type RequestStatusCodeState = RequestStatusCode | null;

export interface RequestState {
  status: RequestStatus,
  statusCode: RequestStatusCodeState,
}

type ReducerKey = any;
type ReducerState = any;
type ExtraReducer = CaseReducer<any, ReturnType<any>> | CaseReducer<any, any>;
type ReducerConfig = [ReducerKey, ExtraReducer];
type WithRequestState<S> = S & { requestState: RequestState };

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
 * Builds extra reducers config for handling default request statuses
 * The second argument can be used to specify specific statuses (RequestStatus) as an array
 * The third argument can be used for selecting where status should be written
 * @param actionCreator
 * @param statuses
 * @param pathSelector
 */
export const handleDefaultRequestStatuses = (
  actionCreator: any,
  statuses: RequestStatus[] = Object.values(requestStatuses),
  pathSelector?: (reducerState: ReducerState) => WithRequestState<ReducerState>,
): ExtraReducersConfig => statuses.map(
  (status: RequestStatus): [ReducerKey, ExtraReducer] => [
    actionCreator[statusesToThunkMapping[status]],
    (reducerState: ReducerState, { error }): void => {
      const { requestState }: WithRequestState<ReducerState> = pathSelector
        ? pathSelector(reducerState)
        : reducerState;

      if (!requestState) {
        throw new Error(
          'Default request statuses handler was incorrectly initialized, it might need to pass the correct patch selector',
        );
      }

      let statusCode: RequestStatusCodeState = null;

      requestState.status = status;

      if (error) {
        const requestStatus: number = getStatusCode(error);

        if (!Number.isNaN(requestStatus) && (statusCodes as number[]).includes(requestStatus)) {
          statusCode = requestStatus as RequestStatusCode;
        }
      }

      requestState.statusCode = statusCode;
    },
  ],
);
