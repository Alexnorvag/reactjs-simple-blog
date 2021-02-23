/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { PostData, PostsState } from './index';
import { requestStatuses } from '../../../constants/api';
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
  fetchNewPostId,
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
    { payload }: PayloadAction<{ posts: PostData[], total: number }>,
  ) => {
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
  ) => {
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
  ) => {
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
    { payload: { id } }: PayloadAction<{ id: string }>,
  ) => {
    postsList.total -= 1;
    postsList.posts = postsList.posts.filter(({ _id }) => _id !== id);
  }],

  // Fetch new post id
  [fetchNewPostId.fulfilled, (
    { newPost }: PostsState,
    { payload }: PayloadAction<string>,
  ) => {
    newPost._id = payload;
    newPost.requestState = successRequestState;
  }],
  ...handleDefaultRequestStatuses(
    fetchNewPostId,
    [requestStatuses.failed, requestStatuses.pending],
    ({ newPost }: PostsState) => newPost,
  ),
];
