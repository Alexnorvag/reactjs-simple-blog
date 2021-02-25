import { createSlice } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import AuthReducerName from '../../../constants/authReducerName.enum';
import { extraReducersAdapter, RequestState } from '../../../utils/reducersUtils';
import { readFromLocalStorage } from '../../../utils/localStorageUtils';
import { reducers, extraReducers } from './reducer';
import { RootState } from '../../../store';
import { AuthState } from './interfaces';
import {
  signUp,
  signIn,
  signOut,
  resetAuth,
} from './actions';

const requestInitialState: RequestState = {
  status: requestStatuses.succeeded,
  statusCode: null,
};

const initialState: AuthState = {
  signedIn: !!readFromLocalStorage('accessToken'),
  userName: readFromLocalStorage('currentUserName') || '',
  roles: readFromLocalStorage('currentUserRoles')?.split(',') || [],
  [AuthReducerName.signIn]: {
    requestState: requestInitialState,
  },
  [AuthReducerName.signUp]: {
    requestState: requestInitialState,
  },
  [AuthReducerName.signOut]: {
    requestState: requestInitialState,
  },
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
  selectUserRoles: (state: RootState) => state.auth.roles,
  selectSignInRequestState: (state: RootState) => state.auth.signIn.requestState,
  selectSignUpRequestState: (state: RootState) => state.auth.signUp.requestState,
  selectAuthLoading: (state: RootState) => Object.values(AuthReducerName).some((
    fieldName: AuthReducerName,
  ) => state.auth[fieldName].requestState.status === requestStatuses.pending),
};

export const actions = {
  ...slice.actions,
  signUp,
  signIn,
  signOut,
  resetAuth,
};

export default slice.reducer;
