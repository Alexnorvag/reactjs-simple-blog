/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import { handleDefaultRequestStatuses, ExtraReducersConfig, RequestState } from '../../../utils/reducersUtils';
import { AuthState } from './index';
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
  ...handleDefaultRequestStatuses(signUp),

  // SignIn reducers
  [signIn.fulfilled, (
    state: AuthState,
    { payload: { username, roles } }: PayloadAction<{ username: string, roles: string[] }>,
  ) => {
    state.signedIn = true;
    state.requestState = successRequestState;
    state.userName = username;
    state.roles = roles;
  }],
  ...handleDefaultRequestStatuses(
    signIn, [requestStatuses.failed, requestStatuses.pending],
  ),

  // SignOut reducers
  [signOut.fulfilled, (state: AuthState) => {
    state.signedIn = false;
    state.requestState = successRequestState;
  }],
  ...handleDefaultRequestStatuses(
    signOut, [requestStatuses.failed, requestStatuses.pending],
  ),

  // Reset auth reducer
  [resetAuth.type, (state: AuthState) => {
    state.userName = '';
    state.signedIn = false;
    state.requestState = successRequestState;
  }],
];
