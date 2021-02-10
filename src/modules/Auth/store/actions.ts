import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken } from '../../../utils/accessToken';
import { apiUrl } from '../../../constants/api';

interface AuthCredentials {
  username: string;
  password: string;
}

export interface SignUpPayload {
  username: string;
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (authCredentials: AuthCredentials): Promise<SignUpPayload> => {
    const response = await axios.post(`${apiUrl}/auth/signup`, authCredentials);

    return { username: response.data.username };
  },
);

export interface SignInPayload {
  username: string;
}

export const signIn = createAsyncThunk(
  'posts/signIn',
  async (authCredentials: AuthCredentials): Promise<SignInPayload> => {
    const response = await axios.post(`${apiUrl}/auth/signin`, authCredentials);

    setAccessToken(response.data.accessToken);

    return { username: response.data.username };
  },
);
