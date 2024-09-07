import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';
import PostReducer from './reducers/PostReducer';
import ProfileReducer from './reducers/ProfileReducer';
import fetchedPostReducer from './reducers/FetchedPostReducer';

const rootReducer = combineReducers({
  auth:authReducer,
  post:PostReducer,
  fetchedPosts:fetchedPostReducer,
  profile:ProfileReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
