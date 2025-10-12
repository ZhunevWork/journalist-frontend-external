import { createSlice } from '@reduxjs/toolkit';
import type { IProfileData, IUserData } from '~/api/controllers/auth/types';

export const USER_TOKEN = 'userToken';
export const PROFILE_DATA = 'profileData';
export const USER_DATA = 'userData';

interface InitialStateType {
  userData: IUserData | null;
  profileData: IProfileData | null;
  userToken: string | null;
}

const initialState: InitialStateType = {
  userData:
    typeof window !== 'undefined' && localStorage.getItem(PROFILE_DATA)
      ? JSON.parse(localStorage.getItem(USER_DATA) ?? '')
      : null,
  profileData:
    typeof window !== 'undefined' && localStorage.getItem(PROFILE_DATA)
      ? JSON.parse(localStorage.getItem(PROFILE_DATA) ?? '')
      : null,
  userToken:
    typeof window !== 'undefined' ? localStorage.getItem(USER_TOKEN) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLogout: state => {
      localStorage.removeItem(USER_TOKEN);
      localStorage.removeItem(USER_DATA);
      localStorage.removeItem(PROFILE_DATA);

      state.profileData = null;
      state.userData = null;
      state.userToken = null;
    },
    setUserToken: (state, action) => {
      state.userToken = action.payload;
      localStorage.setItem(USER_TOKEN, action.payload);
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem(USER_DATA, JSON.stringify(action.payload));
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
      localStorage.setItem(PROFILE_DATA, JSON.stringify(action.payload));
    },
  },
});

export const { setUserLogout, setUserToken, setProfileData, setUserData } =
  authSlice.actions;

export default authSlice.reducer;
