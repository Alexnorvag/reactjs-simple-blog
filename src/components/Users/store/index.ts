import { createSlice } from '@reduxjs/toolkit';
import { loadingStatuses, LoadingStatuses } from '../../../constants/api';
import { extraReducersAdapter } from '../../../utils/reducersUtils';
import { reducers, extraReducers } from './reducer';
import { fetchUsers, deleteUser } from './actions';
import { RootState } from '../../../store';

export interface UserData {
  _id: string;
  username: string;
  posts: string[];
}

export interface UsersState {
  users: UserData[];
  total: number;
  loading: LoadingStatuses;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  loading: loadingStatuses.pending,
};

export const slice = createSlice({
  name: 'users',
  initialState,
  reducers,
  extraReducers: extraReducersAdapter(extraReducers),
});

export const selectors = {
  selectUsers: (state: RootState) => state.users.users,
  selectTotal: (state: RootState) => state.users.total,
  selectLoading: (state: RootState) => state.users.loading,
};

export const actions = {
  ...slice.actions,
  fetchUsers,
  deleteUser,
};

export default slice.reducer;
