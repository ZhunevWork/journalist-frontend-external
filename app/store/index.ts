import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commonApi } from '~/api/common.api';
import authSlice from '~/store/authSlice';
import notificationsSlice from '~/store/notificationSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  notifications: notificationsSlice,
  [commonApi.reducerPath]: commonApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(commonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
