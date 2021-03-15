import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getAccessToken } from '../../../utils/localStorageUtils';
import { buildQueryString } from '../../../utils/queryStringUtils';
import { DeleteUserPayload, FetchUsersPayload } from './interfaces';
import { usersDefaultSearchParams } from '../../../constants/api';
import apiRoutes from '../../../constants/apiRoutes';

export const fetchUsers = createAsyncThunk(
  'users/fetchAll',
  async (query: string): Promise<FetchUsersPayload> => {
    const response = await axios.get(
      `${apiRoutes.fetchUsers}${buildQueryString(usersDefaultSearchParams, query, true)}`,
      { headers: { Authorization: getAccessToken() } },
    );

    return response.data;
  },
);

export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id: string): Promise<DeleteUserPayload> => {
    await axios.delete(
      apiRoutes.deleteUserById(id),
      { headers: { Authorization: getAccessToken() } },
    );

    message.success('User successfully deleted');

    return { id };
  },
);
