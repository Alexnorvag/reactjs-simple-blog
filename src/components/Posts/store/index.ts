import { createSlice } from '@reduxjs/toolkit';
import { loadingStatuses, LoadingStatuses } from '../../../constants/api';
import { extraReducersAdapter } from '../../../utils/reducersUtils';
import { reducers, extraReducers } from './reducer';
import { RootState } from '../../../store';
import { UserData } from '../../Users/store';
import {
  createPost,
  updatePost,
  fetchPost,
  fetchBeingEditedPost,
  fetchPosts,
  deletePost,
} from './actions';

export interface PostData {
  _id: string;
  title: string;
  body: string;
  user: Omit<UserData, 'posts'>;
}

export type NewPostData = Omit<PostData, '_id' | 'user'>;

interface PostState {
  post: PostData,
  loading: LoadingStatuses;
}

export interface PostsState {
  beingEditedPost: PostState;
  currentlyViewedPost: PostState;
  newPost: {
    loading: LoadingStatuses;
  };
  postsList: {
    posts: PostData[],
    total: number;
    loading: LoadingStatuses;
  };
}

const postInitialState: PostData = {
  _id: '',
  title: '',
  body: '',
  user: {
    _id: '',
    username: '',
  },
};

const initialState: PostsState = {
  beingEditedPost: {
    post: postInitialState,
    loading: loadingStatuses.pending,
  },
  currentlyViewedPost: {
    post: postInitialState,
    loading: loadingStatuses.pending,
  },
  newPost: {
    loading: loadingStatuses.succeeded,
  },
  postsList: {
    posts: [],
    loading: loadingStatuses.pending,
    total: 0,
  },
};

export const slice = createSlice({
  name: 'posts',
  initialState,
  reducers,
  extraReducers: extraReducersAdapter(extraReducers),
});

export const selectors = {
  selectCurrentlyViewedPost: (state: RootState) => state.posts.currentlyViewedPost,
  selectCreatedPostLoading: (state: RootState) => state.posts.newPost.loading,
  selectBeingEditedPost: (state: RootState) => state.posts.beingEditedPost,
  selectPostsList: (state: RootState) => state.posts.postsList,
};

export const actions = {
  ...slice.actions,
  createPost,
  fetchPost,
  fetchBeingEditedPost,
  fetchPosts,
  updatePost,
  deletePost,
};

export default slice.reducer;
