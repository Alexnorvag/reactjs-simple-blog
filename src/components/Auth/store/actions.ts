import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { apiUrl, RequestStatusCode } from '../../../constants/api';
import {
  clearLocalStorage,
  getAccessToken,
  writeToLocalStorage,
} from '../../../utils/localStorageUtils';
import { RequestStatusCodeState } from '../../../utils/reducersUtils';

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface SignUpPayload {
  statusCode: RequestStatusCodeState;
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authCredentials: AuthCredentials): Promise<SignUpPayload> => {
    const payload: SignUpPayload = { statusCode: null };

    try {
      await axios.post(
        `${apiUrl}/auth/signUp`,
        authCredentials,
      );
    } catch (error) {
      const errorMessage = error.message;
      const statusCode: number = parseInt(errorMessage, 10);

      // REVIEW: Actions creators isn't the best place to perform side effects
      // It is would be better to move side effects to middleware or somewhere else
      if (statusCode === 400) {
        message.warn(errorMessage.replace(/^\d+\s/, ''));

        payload.statusCode = statusCode;
      } else {
        throw new Error(errorMessage);
      }
    }

    return payload;
  },
);

export interface SignInPayload {
  username: string;
  roles: string[];
  statusCode?: RequestStatusCode;
}

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    authCredentials: AuthCredentials,
  ): Promise<SignInPayload> => {
    const payload: SignInPayload = {
      username: '',
      roles: [],
    };

    try {
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

      payload.username = username;
      payload.roles = roles;
    } catch (error) {
      const errorMessage = error.message;
      const statusCode: number = parseInt(errorMessage, 10);
      const errorsToBeHandled = [400, 401] as const;

      // REVIEW: Actions creators isn't the best place to perform side effects
      // It is would be better to move side effects to middleware or somewhere else
      if (([...errorsToBeHandled] as number[]).includes(statusCode)) {
        message.warn(errorMessage.replace(/^\d+\s/, ''));

        payload.statusCode = statusCode as typeof errorsToBeHandled[number];
      } else {
        throw new Error(errorMessage);
      }
    }

    return payload;
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
