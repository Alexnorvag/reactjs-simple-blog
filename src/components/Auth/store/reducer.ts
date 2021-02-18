/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { loadingStatuses } from '../../../constants/api';
import { handleDefaultLoadingStatuses, ExtraReducersConfig } from '../../../utils/reducersUtils';
import { AuthState } from './index';
import {
  signUp,
  signIn,
  signOut,
  resetAuth,
} from './actions';

export const reducers = {};

export const extraReducers: ExtraReducersConfig = [
  // SignUp reducers
  ...handleDefaultLoadingStatuses(signUp),

  // SignIn reducers
  [signIn.fulfilled, (
    state: AuthState,
    { payload: { username } }: PayloadAction<{ username: string }>,
  ) => {
    state.signedIn = true;
    state.loading = loadingStatuses.succeeded;
    state.userName = username;
  }],
  ...handleDefaultLoadingStatuses(
    signIn, [loadingStatuses.failed, loadingStatuses.pending],
  ),

  // SignOut reducers
  [signOut.fulfilled, (state: AuthState) => {
    state.signedIn = false;
    state.loading = loadingStatuses.succeeded;
  }],
  ...handleDefaultLoadingStatuses(
    signOut, [loadingStatuses.failed, loadingStatuses.pending],
  ),

  // Reset auth reducer
  [resetAuth.type, (state: AuthState) => {
    state.userName = '';
    state.signedIn = false;
    state.loading = loadingStatuses.succeeded;
  }],
];
