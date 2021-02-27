import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { message } from 'antd';
import { getAccessToken } from '../../../utils/localStorageUtils';
import { buildQueryString } from '../../../utils/queryStringUtils';
import { postsDefaultSearchParams } from '../../../constants/api';
import apiRoutes from '../../../constants/apiRoutes';
import history from '../../../constants/history';
import {
  PostData,
  NewPostData,
  FetchPostsPayload,
  DeletePostPayload,
} from './interfaces';

const fetchPostPayloadCreator = async (id: string): Promise<PostData> => {
  const { data } = await axios.get(
    apiRoutes.fetchPostById(id),
    { headers: { Authorization: getAccessToken() } },
  );

  return data;
};

export const createPost = createAsyncThunk(
  'posts/create',
  async (postData: NewPostData): Promise<void> => {
    const { data } = await axios.post(
      apiRoutes.createPost,
      postData,
      { headers: { Authorization: getAccessToken() } },
    );

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    message.success(`Post "${data.title}" successfully created!`);
    history.push(`/post/${data._id}`);
  },
);

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
  async (query: string): Promise<FetchPostsPayload> => {
    const { data } = await axios.get(
      `${apiRoutes.fetchPosts}${buildQueryString(postsDefaultSearchParams, query, true)}`,
      { headers: { Authorization: getAccessToken() } },
    );

    return data;
  },
);

export const updatePost = createAsyncThunk(
  'posts/update',
  async (
    {
      id,
      postData,
    }: {
      id: string,
      postData: NewPostData,
    },
  ): Promise<void> => {
    const { data: { _id } } = await axios.patch(
      apiRoutes.updatePostById(id),
      postData,
      { headers: { Authorization: getAccessToken() } },
    );

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    message.success('Post successfully updated!');
    history.push(`/post/${_id}`);
  },
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (id: string): Promise<DeletePostPayload> => {
    try {
      await axios.delete(
        apiRoutes.deletePostById(id),
        { headers: { Authorization: getAccessToken() } },
      );
    } catch (e) {
      const errorMessage: string = 'Cannot delete post!';

      // REVIEW: Actions creators isn't the best place to perform side effects
      // It is would be better to move side effects to middleware or somewhere else
      message.error(errorMessage);

      throw new Error(errorMessage);
    }

    // REVIEW: Actions creators isn't the best place to perform side effects
    // It is would be better to move side effects to middleware or somewhere else
    message.success('Post successfully deleted!');

    return { id };
  },
);
