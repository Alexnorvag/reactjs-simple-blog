import { RequestState, RequestStatusCodeState } from '../../../utils/reducersUtils';
import AuthReducerName from '../../../constants/authReducerName.enum';

export interface AuthState {
  signedIn: boolean;
  userName: string;
  roles: string[];
  [AuthReducerName.signIn]: {
    requestState: RequestState;
  };
  [AuthReducerName.signUp]: {
    requestState: RequestState;
  };
  [AuthReducerName.signOut]: {
    requestState: RequestState;
  };
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface WithRequestStatusCode {
  statusCode?: RequestStatusCodeState;
}

export interface SignUpPayload extends WithRequestStatusCode {}

export interface SignInPayload extends WithRequestStatusCode {
  username: string;
  roles: string[];
}
