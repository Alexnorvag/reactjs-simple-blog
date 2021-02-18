import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getAccessToken } from '../../../utils/localStorageUtils';
import { buildQueryString } from '../../../utils/queryStringUtils';
import { apiUrl, usersDefaultSearchParams } from '../../../constants/api';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (query: string) => {
    const response = await axios.get(
      `${apiUrl}/users${buildQueryString(usersDefaultSearchParams, query, true)}`,
      { headers: { Authorization: getAccessToken() } },
    );

    return response.data;
  },
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: string): Promise<{ id: string }> => {
    await axios.delete(
      `${apiUrl}/users/${id}`,
      { headers: { Authorization: getAccessToken() } },
    );

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    message.success('User successfully deleted');

    return { id };
  },
);
