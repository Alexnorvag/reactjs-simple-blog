/* eslint-disable no-param-reassign */

import { PayloadAction } from '@reduxjs/toolkit';
import { loadingStatuses } from '../../../constants/api';
import { ExtraReducersConfig } from '../../../utils/extraReducers.adapter';
import { setLoadingStatus } from '../../../utils/reduxStateManagement';
import { fetchPost, fetchPosts } from './actions';
import { PostData, PostsState } from './index';

export const reducers = {};

export const asyncReducers: ExtraReducersConfig = [
  // Post handlers
  [fetchPost.fulfilled, (state: PostsState, action: PayloadAction<PostData>) => {
    state.post = action.payload;
    state.loading = loadingStatuses.succeeded;
  }],
  [fetchPost.rejected, setLoadingStatus(loadingStatuses.failed)],
  [fetchPost.pending, setLoadingStatus(loadingStatuses.pending)],

  // Posts list handlers
  [fetchPosts.fulfilled, (state: PostsState, action: PayloadAction<PostData[]>) => {
    state.posts = action.payload;
    state.loading = loadingStatuses.succeeded;
  }],
  [fetchPosts.rejected, setLoadingStatus(loadingStatuses.failed)],
  [fetchPosts.pending, setLoadingStatus(loadingStatuses.pending)],
];
