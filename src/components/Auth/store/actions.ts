import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { clearLocalStorage, writeToLocalStorage } from '../../../utils/localStorageUtils';
import { apiUrl } from '../../../constants/api';

export interface AuthCredentials {
  username: string;
  password: string;
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authCredentials: AuthCredentials): Promise<void> => axios.post(
    `${apiUrl}/auth/signUp`,
    authCredentials,
  ),
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (authCredentials: AuthCredentials): Promise<void> => {
    const { data } = await axios.post(`${apiUrl}/auth/signIn`, authCredentials);

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    writeToLocalStorage({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      currentUserName: data.username,
      currentUserId: data._id,
    });
  },
);

export const signOut = createAction(
  'auth/signOut',
  (): { payload: boolean } => {
    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    clearLocalStorage();

    return { payload: true };
  },
);
