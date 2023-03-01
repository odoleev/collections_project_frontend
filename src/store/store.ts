import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer, alertReducer } from './reducers';
import { authAPI, usersAPI, collectionsAPI } from './services';
import { itemsAPI } from './services/ItemsServices';

const rootReducer = combineReducers({
  authReducer,
  alertReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [usersAPI.reducerPath]: usersAPI.reducer,
  [collectionsAPI.reducerPath]: collectionsAPI.reducer,
  [itemsAPI.reducerPath]: itemsAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        authAPI.middleware,
        usersAPI.middleware,
        collectionsAPI.middleware,
        itemsAPI.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
