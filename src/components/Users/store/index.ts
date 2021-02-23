import { createSlice } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import { extraReducersAdapter, RequestState } from '../../../utils/reducersUtils';
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
  requestState: RequestState;
}

const initialState: UsersState = {
  users: [],
  total: 0,
  requestState: {
    status: requestStatuses.succeeded,
    statusCode: null,
  },
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
  selectRequestState: (state: RootState) => state.users.requestState,
};

export const actions = {
  ...slice.actions,
  fetchUsers,
  deleteUser,
};

export default slice.reducer;
