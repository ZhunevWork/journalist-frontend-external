import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { INotification } from '~/api/controllers/notifications/types';

interface NotificationsState {
  notifications: INotification[];
  hasMore: boolean;
}

const initialState: NotificationsState = {
  notifications: [],
  hasMore: true,
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications = action.payload;
    },
    addNotifications: (state, action: PayloadAction<INotification[]>) => {
      state.notifications.push(...action.payload);
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const n = state.notifications.find(n => n.id === action.payload);
      if (n) n.read_at = new Date().toISOString();
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
  },
});

export const { setNotifications, addNotifications, markAsRead, setHasMore } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
