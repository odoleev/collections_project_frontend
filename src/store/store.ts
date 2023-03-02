import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {authReducer, alertReducer, searchReducer} from './reducers';
// eslint-disable-next-line import/no-cycle
import {
  authAPI,
  usersAPI,
  collectionsAPI,
  commentsAPI,
  itemsAPI,
} from './services';

const rootReducer = combineReducers({
  authReducer,
  alertReducer,
  searchReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [collectionsAPI.reducerPath]: collectionsAPI.reducer,
  [itemsAPI.reducerPath]: itemsAPI.reducer,
  [commentsAPI.reducerPath]: commentsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        usersAPI.middleware,
        collectionsAPI.middleware,
        itemsAPI.middleware,
        commentsAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
