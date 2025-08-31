import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'sonner';

export const USER_TOKEN = 'userToken';
export const USER_INFO = 'userInfo';

interface InitialStateType {
  userInfo: { username: string; role: string };
  userToken: string | null;
}

const initialState: InitialStateType = {
  userInfo: { username: '', role: '' },
  userToken:
    typeof window !== 'undefined' ? localStorage.getItem(USER_TOKEN) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLogout: state => {
      localStorage.removeItem(USER_TOKEN);

      state.userInfo = { username: '', role: '' };
      state.userToken = null;
    },
    setUserToken: (state, action) => {
      try {
        state.userToken = action.payload;
        localStorage.setItem(USER_TOKEN, action.payload);
      } catch (e) {
        console.error(e);
        toast.error('Передан невалидный токен!', { duration: 1000 });
      }
    },
  },
});

export const { setUserLogout, setUserToken } = authSlice.actions;

export default authSlice.reducer;
