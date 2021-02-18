import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import authReducer from './components/Auth/store';
import usersReducer from './components/Users/store';
import postsReducer from './components/Posts/store';
import history from './constants/history';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    posts: postsReducer,
  },
  middleware: getDefaultMiddleware().concat(() => (next) => async (action) => {
    const { error } = action;

    if (
      error
      && error.message === 'Request failed with status code 401'
      && !action.type.match('auth/')
    ) {
      history.push('/auth/signIn', history.location.pathname);
    }

    return next(action);
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
