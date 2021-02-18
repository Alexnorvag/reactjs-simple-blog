/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { loadingStatuses } from '../../../constants/api';
import { handleDefaultLoadingStatuses, ExtraReducersConfig } from '../../../utils/reducersUtils';
import { fetchUsers, deleteUser } from './actions';
import { UserData, UsersState } from './index';

export const reducers = {};

export const extraReducers: ExtraReducersConfig = [
  // Retrieve users list reducers
  [fetchUsers.fulfilled, (
    state: UsersState,
    action: PayloadAction<{ users: UserData[], total: number }>,
  ) => {
    const { payload } = action;

    state.users = payload.users;
    state.total = payload.total;
    state.loading = loadingStatuses.succeeded;
  }],
  ...handleDefaultLoadingStatuses(
    fetchUsers, [loadingStatuses.failed, loadingStatuses.pending],
  ),

  // Delete user reducers
  [deleteUser.fulfilled, (
    state: UsersState,
    { payload: { id } }: PayloadAction<{ id: string }>,
  ) => {
    state.total -= 1;
    state.users = state.users.filter(({ _id }) => _id !== id);
    state.loading = loadingStatuses.succeeded;
  }],
  ...handleDefaultLoadingStatuses(
    deleteUser, [loadingStatuses.failed, loadingStatuses.pending],
  ),
];
