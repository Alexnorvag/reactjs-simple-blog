/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { loadingStatuses } from '../../../constants/api';
import { ExtraReducersConfig } from '../../../utils/extraReducers.adapter';
import { setLoadingStatus } from '../../../utils/reduxStateManagement';
import { AuthState } from './index';
import {
  signUp,
  signIn,
  SignUpPayload,
  SignInPayload,
} from './actions';

export const reducers = {};

export const asyncReducers: ExtraReducersConfig = [
  // SignUp handlers
  [signUp.fulfilled, (state: AuthState, action: PayloadAction<SignUpPayload>) => {
    state.username = action.payload.username;
    state.loading = loadingStatuses.succeeded;
  }],
  [signUp.rejected, setLoadingStatus(loadingStatuses.failed)],
  [signUp.pending, setLoadingStatus(loadingStatuses.pending)],

  // SignIn handlers
  [signIn.fulfilled, (state: AuthState, action: PayloadAction<SignInPayload>) => {
    state.username = action.payload.username;
    state.loading = loadingStatuses.succeeded;
  }],
  [signIn.rejected, setLoadingStatus(loadingStatuses.failed)],
  [signIn.pending, setLoadingStatus(loadingStatuses.pending)],
];
