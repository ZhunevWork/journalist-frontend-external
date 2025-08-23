import { createSlice } from '@reduxjs/toolkit';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { toast } from 'sonner';

export const USER_TOKEN_LS = 'userToken';
export const USER_INFO_LS = 'userInfo';

interface InitialStateType {
  userInfo: { username: string; role: string };
  userToken: string | null;
}

const initialState: InitialStateType = {
  userInfo: { username: '', role: '' },
  userToken: '',
  // localStorage.getItem(USER_TOKEN_LS),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLogout: state => {
      // localStorage.removeItem(USER_TOKEN_LS);

      state.userInfo = { username: '', role: '' };
      state.userToken = null;
    },
    setUserToken: (state, action) => {
      try {
        state.userToken = action.payload;
      } catch (e) {
        console.error(e);
        toast.error('Передан невалидный токен!', { duration: 10000 });
      }
    },
  },
});

export const { setUserLogout, setUserToken } = authSlice.actions;

export default authSlice.reducer;
