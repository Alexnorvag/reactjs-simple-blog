/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { PostData, PostsState } from './index';
import { loadingStatuses } from '../../../constants/api';
import { handleDefaultLoadingStatuses, ExtraReducersConfig } from '../../../utils/reducersUtils';
import {
  createPost,
  fetchPosts,
  fetchPost,
  fetchBeingEditedPost,
  updatePost,
  deletePost,
} from './actions';

export const reducers = {};

export const extraReducers: ExtraReducersConfig = [
  // Create post reducers
  ...handleDefaultLoadingStatuses(
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
    postsList.loading = loadingStatuses.succeeded;
  }],
  ...handleDefaultLoadingStatuses(
    fetchPosts,
    [loadingStatuses.failed, loadingStatuses.pending],
    ({ postsList }: PostsState) => postsList,
  ),

  // Retrieve the post reducers
  [fetchPost.fulfilled, (
    { currentlyViewedPost }: PostsState,
    { payload }: PayloadAction<PostData>,
  ) => {
    currentlyViewedPost.post = payload;
    currentlyViewedPost.loading = loadingStatuses.succeeded;
  }],
  ...handleDefaultLoadingStatuses(
    fetchPost,
    [loadingStatuses.failed, loadingStatuses.pending],
    ({ currentlyViewedPost }: PostsState) => currentlyViewedPost,
  ),

  // Retrieve the being edited post reducers
  [fetchBeingEditedPost.fulfilled, (
    { beingEditedPost }: PostsState,
    { payload }: PayloadAction<PostData>,
  ) => {
    beingEditedPost.post = payload;
    beingEditedPost.loading = loadingStatuses.succeeded;
  }],
  ...handleDefaultLoadingStatuses(
    fetchBeingEditedPost,
    [loadingStatuses.failed, loadingStatuses.pending],
    ({ currentlyViewedPost }: PostsState) => currentlyViewedPost,
  ),

  // Update post reducers
  ...handleDefaultLoadingStatuses(updatePost),

  // Delete post reducers
  [deletePost.fulfilled, (
    { postsList }: PostsState,
    { payload: { id } }: PayloadAction<{ id: string }>,
  ) => {
    postsList.total -= 1;
    postsList.posts = postsList.posts.filter(({ _id }) => _id !== id);
  }],
  ...handleDefaultLoadingStatuses(
    deletePost,
    [loadingStatuses.failed, loadingStatuses.pending],
    ({ postsList }: PostsState) => postsList,
  ),
];
