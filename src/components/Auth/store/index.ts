import { createSlice } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import { AuthReducersName } from '../../../constants/reducerName';
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
  userName: string;
  roles: string[];
  [AuthReducersName.signIn]: {
    requestState: RequestState;
  };
  [AuthReducersName.signUp]: {
    requestState: RequestState;
  };
  [AuthReducersName.signOut]: {
    requestState: RequestState;
  };
}

const requestInitialState: RequestState = {
  status: requestStatuses.succeeded,
  statusCode: null,
};

const initialState: AuthState = {
  signedIn: !!readFromLocalStorage('accessToken'),
  userName: readFromLocalStorage('currentUserName') || '',
  roles: readFromLocalStorage('currentUserRoles')?.split(',') || [],
  [AuthReducersName.signIn]: {
    requestState: requestInitialState,
  },
  [AuthReducersName.signUp]: {
    requestState: requestInitialState,
  },
  [AuthReducersName.signOut]: {
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
  selectAuthLoading: (state: RootState) => Object.values(AuthReducersName).some((
    fieldName: AuthReducersName,
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
