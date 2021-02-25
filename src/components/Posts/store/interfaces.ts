import { RequestState } from '../../../utils/reducersUtils';
import { UserData } from '../../Users/store/interfaces';

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

export interface FetchPostsPayload {
  posts: PostData[],
  total: number,
}

export interface DeletePostPayload {
  id: string;
}
