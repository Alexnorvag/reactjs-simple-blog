import { createSlice } from '@reduxjs/toolkit';
import { requestStatuses } from '../../../constants/api';
import { extraReducersAdapter, RequestState } from '../../../utils/reducersUtils';
import { reducers, extraReducers } from './reducer';
import { RootState } from '../../../store';
import { UserData } from '../../Users/store';
import {
  createPost,
  fetchNewPostId,
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

export type NewPostData = Omit<PostData, '_id' | 'user'> & { _id?: string };

interface PostState {
  post: PostData,
  requestState: RequestState;
}

export interface PostsState {
  beingEditedPost: PostState;
  currentlyViewedPost: PostState;
  newPost: {
    _id: string,
    requestState: RequestState;
  };
  postsList: {
    posts: PostData[],
    total: number;
    requestState: RequestState;
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
