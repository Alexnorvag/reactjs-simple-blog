import { RequestState } from '../../../utils/reducersUtils';

export interface UserData {
  _id: string;
  username: string;
  posts: string[];
}

export interface UsersState {
  users: UserData[];
  total: number;
  requestState: RequestState;
}

export interface FetchUsersPayload {
  users: UserData[];
  total: number;
}

export interface DeleteUserPayload {
  id: string;
}
