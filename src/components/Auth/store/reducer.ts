/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import { ExtraReducersConfig, handleDefaultRequestStatuses, RequestState } from '../../../utils/reducersUtils';
import { AuthReducersName } from '../../../constants/reducerName';
import { AuthState } from './index';
import {
  signUp,
  signIn,
  signOut,
  resetAuth,
  SignUpPayload,
  SignInPayload,
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
  ) => {
    state.signUp.requestState = {
      statusCode,
      status: requestStatuses.succeeded,
    };
  }],
  ...handleDefaultRequestStatuses(
    signUp,
    [requestStatuses.failed, requestStatuses.pending],
    (authState: AuthState) => authState[AuthReducersName.signUp],
  ),

  // SignIn reducers
  [signIn.fulfilled, (
    state: AuthState,
    { payload: { username, roles, statusCode } }: PayloadAction<SignInPayload>,
  ) => {
    state.signedIn = !statusCode;
    state.userName = username;
    state.roles = roles;
    state.signIn.requestState = {
      status: requestStatuses.succeeded,
      statusCode: statusCode || null,
    };
  }],
  ...handleDefaultRequestStatuses(
    signIn,
    [requestStatuses.failed, requestStatuses.pending],
    (authState: AuthState) => authState[AuthReducersName.signIn],
  ),

  // SignOut reducers
  [signOut.fulfilled, (state: AuthState) => {
    state.signedIn = false;
    state.signOut.requestState = successRequestState;
  }],
  ...handleDefaultRequestStatuses(
    signOut,
    [requestStatuses.failed, requestStatuses.pending],
    (authState: AuthState) => authState.signOut,
  ),

  // Reset auth reducer
  [resetAuth.type, (state: AuthState) => {
    state.userName = '';
    state.signedIn = false;
    state[AuthReducersName.signOut].requestState = successRequestState;
    state[AuthReducersName.signIn].requestState = successRequestState;
  }],
];
