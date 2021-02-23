import { createSlice } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import { extraReducersAdapter, RequestState } from '../../../utils/reducersUtils';
import { readFromLocalStorage } from '../../../utils/localStorageUtils';
import { reducers, extraReducers } from './reducer';
import { RootState } from '../../../store';
import {
  signUp,
  signIn,
  signOut,
  resetAuth,
} from './actions';

export interface AuthState {
  signedIn: boolean;
  userName: string,
  requestState: RequestState;
}

const requestInitialState: RequestState = {
  status: requestStatuses.succeeded,
  statusCode: null,
};

const initialState: AuthState = {
  signedIn: !!readFromLocalStorage('accessToken'),
  userName: readFromLocalStorage('currentUserName') || '',
  requestState: requestInitialState,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers,
  extraReducers: extraReducersAdapter(extraReducers),
});

export const selectors = {
  selectSignedIn: (state: RootState) => state.auth.signedIn,
  selectUserName: (state: RootState) => state.auth.userName,
  selectRequestState: (state: RootState) => state.auth.requestState,
};

export const actions = {
  ...slice.actions,
  signUp,
  signIn,
  signOut,
  resetAuth,
};

export default slice.reducer;
