import { createSlice } from '@reduxjs/toolkit';
import { loadingStatuses, LoadingStatuses } from '../../../constants/api';
import { extraReducersAdapter } from '../../../utils/reducersUtils';
import { readFromLocalStorage } from '../../../utils/localStorageUtils';
import { reducers, extraReducers } from './reducer';
import { RootState } from '../../../store';
import { signUp, signIn, signOut } from './actions';

export interface AuthState {
  signedIn: boolean;
  userName: string,
  loading: LoadingStatuses;
}

const initialState: AuthState = {
  signedIn: !!readFromLocalStorage('accessToken'),
  userName: readFromLocalStorage('currentUserName') || '',
  loading: loadingStatuses.pending,
};

export const slice = createSlice({
  name: 'auth',
  initialState,
  reducers,
  extraReducers: extraReducersAdapter(extraReducers),
});

export const selectors = {
  selectSignedIn: (state: RootState) => state.auth.signedIn,
  selectUserName: (state: RootState) => state.auth.userName,
  selectLoading: (state: RootState) => state.auth.loading,
};

export const actions = {
  ...slice.actions,
  signUp,
  signIn,
  signOut,
};

export default slice.reducer;
