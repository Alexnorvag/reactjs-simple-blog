import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken } from '../../../utils/accessToken';
import { apiUrl } from '../../../constants/api';

export const fetchPost = createAsyncThunk('posts/fetchById', async (id: string) => {
  const response = await axios.get(
    `${apiUrl}/posts/${id}`,
    { headers: { Authorization: getAccessToken() } },
  );

  return response.data;
});

export const fetchPosts = createAsyncThunk('posts/fetchAll', async (filter?: {[key: string]: string}) => {
  const query = filter ? Object.keys(filter).reduce(
    (result: string, key: string, index: number) => `${result}${index ? '&' : '?'}${key}=${filter[key]}`,
    '',
  ) : '';

  const response = await axios.get(
    `${apiUrl}/posts/${query}`,
    { headers: { Authorization: getAccessToken() } },
  );

  return response.data;
});
