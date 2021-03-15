import axios from 'axios';
import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getErrorMessage, getStatusCode } from '../../../utils/axiosErrorsUtils';
import { RequestStatusCode, requestStatusCodes } from '../../../constants/api';
import apiRoutes from '../../../constants/apiRoutes';
import {
  clearLocalStorage,
  getAccessToken,
  writeToLocalStorage,
} from '../../../utils/localStorageUtils';
import {
  AuthCredentials,
  SignInPayload,
  SignUpPayload,
  WithRequestStatusCode,
} from './interfaces';

const processAuthError = <C extends RequestStatusCode, S extends WithRequestStatusCode>(
  error: Error,
  errorsToBeHandled: Array<C>,
  payload: S,
) => {
  const statusCode: number = getStatusCode(error);

  if (([...errorsToBeHandled] as number[]).includes(statusCode)) {
    message.warn(getErrorMessage(error));

    // eslint-disable-next-line no-param-reassign
    payload.statusCode = statusCode as typeof errorsToBeHandled[number];
  } else {
    throw new Error(error.message);
  }
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authCredentials: AuthCredentials): Promise<SignUpPayload> => {
    const payload: SignUpPayload = {};

    try {
      await axios.post(apiRoutes.signUp, authCredentials);
    } catch (error) {
      processAuthError(error, [requestStatusCodes.badRequest], payload);
    }

    return payload;
  },
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (authCredentials: AuthCredentials): Promise<SignInPayload> => {
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
      } = await axios.post(apiRoutes.signIn, authCredentials);

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
      processAuthError(
        error,
        [requestStatusCodes.badRequest, requestStatusCodes.unauthorized],
        payload,
      );
    }

    return payload;
  },
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  async (): Promise<void> => {
    await axios.post(
      apiRoutes.signOut,
      null,
      { headers: { Authorization: getAccessToken() } },
    );

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
