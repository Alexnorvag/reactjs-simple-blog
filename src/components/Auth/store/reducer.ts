/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import AuthReducerName from '../../../constants/authReducerName.enum';
import { AuthState, SignInPayload, SignUpPayload } from './interfaces';
import {
  ExtraReducersConfig,
  handleDefaultRequestStatuses,
  RequestState,
} from '../../../utils/reducersUtils';
import {
  signUp,
  signIn,
  signOut,
  resetAuth,
} from './actions';

const successRequestState: RequestState = {
  status: requestStatuses.succeeded,
  statusCode: null,
};

export const reducers = {};

export const extraReducers: ExtraReducersConfig = [
  // SignUp reducers
  [signUp.fulfilled, (
    state: AuthState,
    { payload: { statusCode } }: PayloadAction<SignUpPayload>,
  ): void => {
    state[AuthReducerName.signUp].requestState = {
      status: requestStatuses.succeeded,
      statusCode: statusCode || null,
    };
  }],
  ...handleDefaultRequestStatuses(
    signUp,
    [requestStatuses.failed, requestStatuses.pending],
    (authState: AuthState) => authState[AuthReducerName.signUp],
  ),

  // SignIn reducers
  [signIn.fulfilled, (
    state: AuthState,
    { payload: { username, roles, statusCode } }: PayloadAction<SignInPayload>,
  ): void => {
    state.signedIn = !statusCode;
    state.userName = username;
    state.roles = roles;
    state[AuthReducerName.signIn].requestState = {
      status: requestStatuses.succeeded,
      statusCode: statusCode || null,
    };
  }],
  ...handleDefaultRequestStatuses(
    signIn,
    [requestStatuses.failed, requestStatuses.pending],
    (authState: AuthState) => authState[AuthReducerName.signIn],
  ),

  // SignOut reducers
  [signOut.fulfilled, (state: AuthState): void => {
    state.signedIn = false;
    state[AuthReducerName.signOut].requestState = successRequestState;
  }],
  ...handleDefaultRequestStatuses(
    signOut,
    [requestStatuses.failed, requestStatuses.pending],
    (authState: AuthState) => authState.signOut,
  ),

  // Reset auth reducer
  [resetAuth.type, (state: AuthState): void => {
    state.userName = '';
    state.signedIn = false;
    state[AuthReducerName.signOut].requestState = successRequestState;
    state[AuthReducerName.signIn].requestState = successRequestState;
  }],
];
