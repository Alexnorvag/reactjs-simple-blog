import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import {
  clearLocalStorage,
  getAccessToken,
  writeToLocalStorage,
} from '../../../utils/localStorageUtils';
import { apiUrl } from '../../../constants/api';

export interface AuthCredentials {
  username: string;
  password: string;
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authCredentials: AuthCredentials): Promise<void> => {
    await axios.post(
      `${apiUrl}/auth/signUp`,
      authCredentials,
    );
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    authCredentials: AuthCredentials,
  ): Promise<{ username: string, roles: string[] }> => {
    const {
      data: {
        accessToken,
        refreshToken,
        username,
        _id,
        roles,
      },
    } = await axios.post(`${apiUrl}/auth/signIn`, authCredentials);

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    writeToLocalStorage({
      accessToken,
      refreshToken,
      currentUserId: _id,
      currentUserName: username,
      currentUserRoles: roles,
    });

    return { username, roles };
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (): Promise<void> => {
    await axios.post(
      `${apiUrl}/auth/signOut`,
      null,
      { headers: { Authorization: getAccessToken() } },
    );

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    clearLocalStorage();
  },
);

/**
 * Resets auth state
 * @param state
 */
export const resetAuth = createAction(
  'auth/resetAuth',
  (): { payload: boolean } => {
    clearLocalStorage();

    return { payload: true };
  },
);
