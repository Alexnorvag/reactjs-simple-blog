import { createSlice } from '@reduxjs/toolkit';
import { loadingStatuses, LoadingStatuses } from '../../../constants/api';
import extraReducersAdapter from '../../../utils/extraReducers.adapter';
import { reducers, asyncReducers } from './reducer';
import { RootState } from '../../../store';
import { signUp, signIn } from './actions';

export interface AuthState {
  username: string;
  loading: LoadingStatuses;
}

const initialState: AuthState = {
  username: '',
  loading: loadingStatuses.pending,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers,
  extraReducers: extraReducersAdapter(asyncReducers),
});

export const selectors = {
  selectUserName: (state: RootState) => state.auth.username,
  selectLoading: (state: RootState) => state.auth.loading,
};

export const actions = {
  ...slice.actions,
  signUp,
  signIn,
};

export default slice.reducer;
