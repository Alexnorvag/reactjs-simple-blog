/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import {
  PostData,
  PostsState,
  FetchPostsPayload,
  DeletePostPayload,
} from './interfaces';
import {
  handleDefaultRequestStatuses,
  ExtraReducersConfig,
  RequestState,
} from '../../../utils/reducersUtils';
import {
  createPost,
  fetchPosts,
  fetchPost,
  fetchBeingEditedPost,
  updatePost,
  deletePost,
} from './actions';

const successRequestState: RequestState = {
  status: requestStatuses.succeeded,
  statusCode: null,
};

export const reducers = {};

export const extraReducers: ExtraReducersConfig = [
  // Create post reducers
  ...handleDefaultRequestStatuses(
    createPost,
    undefined,
    ({ newPost }: PostsState) => newPost,
  ),

  // Retrieve posts list reducers
  [fetchPosts.fulfilled, (
    { postsList }: PostsState,
    { payload }: PayloadAction<FetchPostsPayload>,
  ): void => {
    postsList.posts = payload.posts;
    postsList.total = payload.total;
    postsList.requestState = successRequestState;
  }],
  ...handleDefaultRequestStatuses(
    fetchPosts,
    [requestStatuses.failed, requestStatuses.pending],
    ({ postsList }: PostsState) => postsList,
  ),

  // Retrieve the post reducers
  [fetchPost.fulfilled, (
    { currentlyViewedPost }: PostsState,
    { payload }: PayloadAction<PostData>,
  ): void => {
    currentlyViewedPost.post = payload;
    currentlyViewedPost.requestState = successRequestState;
  }],
  ...handleDefaultRequestStatuses(
    fetchPost,
    [requestStatuses.failed, requestStatuses.pending],
    ({ currentlyViewedPost }: PostsState) => currentlyViewedPost,
  ),

  // Retrieve the being edited post reducers
  [fetchBeingEditedPost.fulfilled, (
    { beingEditedPost }: PostsState,
    { payload }: PayloadAction<PostData>,
  ): void => {
    beingEditedPost.post = payload;
    beingEditedPost.requestState = successRequestState;
  }],
  ...handleDefaultRequestStatuses(
    fetchBeingEditedPost,
    [requestStatuses.failed, requestStatuses.pending],
    ({ beingEditedPost }: PostsState) => beingEditedPost,
  ),

  // Update post reducers
  ...handleDefaultRequestStatuses(
    updatePost,
    undefined,
    ({ beingEditedPost }: PostsState) => beingEditedPost,
  ),

  // Delete post reducer
  [deletePost.fulfilled, (
    { postsList }: PostsState,
    { payload: { id } }: PayloadAction<DeletePostPayload>,
  ): void => {
    postsList.total -= 1;
    postsList.posts = postsList.posts.filter(({ _id }) => _id !== id);
  }],
];
