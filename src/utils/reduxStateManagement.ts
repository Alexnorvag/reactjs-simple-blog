import { LoadingStatuses } from '../constants/api';

// eslint-disable-next-line import/prefer-default-export
export const setLoadingStatus = <ReducerState extends { loading: LoadingStatuses }>
  (loadingStatus: LoadingStatuses) => (reducerState: ReducerState): void => {
    // eslint-disable-next-line no-param-reassign
    reducerState.loading = loadingStatus;
  };
