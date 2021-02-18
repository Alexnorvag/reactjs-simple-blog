/* eslint-disable no-param-reassign */

import { loadingStatuses } from '../../../constants/api';
import { handleDefaultLoadingStatuses, ExtraReducersConfig } from '../../../utils/reducersUtils';
import { signUp, signIn, signOut } from './actions';
import { AuthState } from './index';

export const reducers = {};

export const extraReducers: ExtraReducersConfig = [
  // SignUp reducers
  ...handleDefaultLoadingStatuses(signUp),

  // SignIn reducers
  [signIn.fulfilled, (state: AuthState) => {
    state.signedIn = true;
    state.loading = loadingStatuses.succeeded;
  }],
  ...handleDefaultLoadingStatuses(
    signIn, [loadingStatuses.failed, loadingStatuses.pending],
  ),

  // SignOut reducers
  [signOut.type, (state: AuthState) => {
    state.signedIn = false;
  }],
];
