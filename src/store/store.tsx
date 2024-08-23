import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/AuthReducer';
import ChartReducer from './reducers/ChartReducer';

const rootReducer = combineReducers({
  auth:authReducer,
  chart:ChartReducer
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
