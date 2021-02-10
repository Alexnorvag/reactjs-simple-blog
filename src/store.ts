import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import postsReducer from './modules/Posts/store';
import authReducer from './modules/Auth/store';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
