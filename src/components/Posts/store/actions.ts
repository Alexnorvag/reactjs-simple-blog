import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getAccessToken } from '../../../utils/localStorageUtils';
import { buildQueryString } from '../../../utils/queryStringUtils';
import { apiUrl, postsDefaultSearchParams } from '../../../constants/api';
import { NewPostData } from './index';
import history from '../../../constants/history';

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData: NewPostData) => {
    const { data } = await axios.post(
      `${apiUrl}/posts`,
      postData,
      { headers: { Authorization: getAccessToken() } },
    );

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    message.success(`Post "${data.title}" successfully created!`);
    history.push(`/post/${data._id}`);

    return data;
  },
);

const fetchPostPayloadCreator = async (id: string) => {
  const { data } = await axios.get(
    `${apiUrl}/posts/${id}`,
    { headers: { Authorization: getAccessToken() } },
  );

  return data;
};

export const fetchPost = createAsyncThunk(
  'posts/fetchById',
  fetchPostPayloadCreator,
);

export const fetchBeingEditedPost = createAsyncThunk(
  'posts/fetchById/edit',
  fetchPostPayloadCreator,
);

export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (query: string) => {
    const { data } = await axios.get(
      `${apiUrl}/posts${buildQueryString(postsDefaultSearchParams, query, true)}`,
      { headers: { Authorization: getAccessToken() } },
    );

    return data;
  },
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async ({ id, postData }: { id: string, postData: NewPostData }) => {
    const { data } = await axios.patch(
      `${apiUrl}/posts/${id}`,
      postData,
      { headers: { Authorization: getAccessToken() } },
    );

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    message.success('Post successfully updated!');
    history.push(`/post/${data._id}`);

    return data;
  },
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: string): Promise<{ id: string }> => {
    await axios.delete(
      `${apiUrl}/posts/${id}`,
      { headers: { Authorization: getAccessToken() } },
    );

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    message.success('Post successfully deleted!');

    return { id };
  },
);
