import { createSlice } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import { extraReducersAdapter, RequestState } from '../../../utils/reducersUtils';
import { reducers, extraReducers } from './reducer';
import { RootState } from '../../../store';
import { PostData, PostsState } from './interfaces';
import {
  createPost,
  fetchNewPostId,
  updatePost,
  fetchPost,
  fetchBeingEditedPost,
  fetchPosts,
  deletePost,
} from './actions';

const postInitialState: PostData = {
  _id: '',
  title: '',
  body: '',
  user: {
    _id: '',
    username: '',
  },
};

const requestInitialState: RequestState = {
  status: requestStatuses.pending,
  statusCode: null,
};

const initialState: PostsState = {
  beingEditedPost: {
    post: postInitialState,
    requestState: requestInitialState,
  },
  currentlyViewedPost: {
    post: postInitialState,
    requestState: requestInitialState,
  },
  newPost: {
    _id: '',
    requestState: requestInitialState,
  },
  postsList: {
    posts: [],
    total: 0,
    requestState: requestInitialState,
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
  selectCreatedPostRequestState: (state: RootState) => state.posts.newPost.requestState,
  selectNewPostId: (state: RootState) => state.posts.newPost._id,
  selectBeingEditedPost: (state: RootState) => state.posts.beingEditedPost,
  selectPostsList: (state: RootState) => state.posts.postsList,
};

export const actions = {
  ...slice.actions,
  createPost,
  fetchNewPostId,
  fetchPost,
  fetchBeingEditedPost,
  fetchPosts,
  updatePost,
  deletePost,
};

export default slice.reducer;
