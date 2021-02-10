import { createSlice } from '@reduxjs/toolkit';
import { loadingStatuses, LoadingStatuses } from '../../../constants/api';
import extraReducersAdapter from '../../../utils/extraReducers.adapter';
import { reducers, asyncReducers } from './reducer';
import { RootState } from '../../../store';
import { fetchPost, fetchPosts } from './actions';

export interface PostData {
  _id: string;
  title: string;
  body: string;
}

export interface PostsState {
  post: PostData;
  posts: PostData[];
  loading: LoadingStatuses;
}

const initialState: PostsState = {
  post: {
    _id: '',
    title: '',
    body: '',
  },
  posts: [],
  loading: loadingStatuses.pending,
};

export const slice = createSlice({
  name: 'posts',
  initialState,
  reducers,
  extraReducers: extraReducersAdapter(asyncReducers),
});

export const selectors = {
  selectPost: (state: RootState) => state.posts.post,
  selectPosts: (state: RootState) => state.posts.posts,
  selectLoading: (state: RootState) => state.posts.loading,
};

export const actions = {
  ...slice.actions,
  fetchPost,
  fetchPosts,
};

export default slice.reducer;
