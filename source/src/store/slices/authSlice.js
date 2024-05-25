import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { clearCookie } from '@/src/utils/cookies';

const initialAccessToken = async () => {
   if (typeof window !== 'undefined') {
      const item = window?.localStorage.getItem('accessToken');
      return item !== 'undefined' ? item : false;
   }
   // return false;
};

const initialRefreshToken = async () => {
   if (typeof window !== 'undefined') {
      const item = window?.localStorage.getItem('refreshToken');
      return item !== 'undefined' ? JSON.parse(item) : false;
   }
   //return false;
};

const initialUserInfo = async () => {
   if (typeof window !== 'undefined') {
      const item = window?.localStorage.getItem('userInfo');
      // return item !== 'undefined' ? JSON.parse(item) : false;
      return item;
   }
   //return false;
};

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      userInfo: initialUserInfo(),
      accessToken: initialAccessToken(),
      refreshToken: initialRefreshToken(),
   },
   reducers: {
      handleRegister: (state, action) => {
         const { name, email, password } = action.payload;
         const user = state.users.find((user) => user.email === email);
         if (user) {
            toast.error('User already exists', {
               position: 'top-right',
               autoClose: 1500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: 'light',
            });
         } else {
            state.users.push({
               id: uuidv4(),
               name,
               email,
               password,
            });
            if (typeof window !== 'undefined') {
               window?.localStorage.setItem('users', JSON.stringify(state.users));
            }
            toast.success('User registered successfully', {
               position: 'top-right',
               autoClose: 1500,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: 'light',
            });
         }
      },

      // eslint-disable-next-line no-unused-vars
      loginSlice: (state, action) => {
         state.accessToken = action.payload.token.accessToken;
         state.userInfo = action.payload.userInfoEncrypted;
         state.refreshToken = action.payload.token.refreshToken;      
      },

      // eslint-disable-next-line no-unused-vars
      refreshAccessTokenSlice: (state, action) => {
         state.accessToken = action.payload.accessToken;
         state.accessTokenExpiry = action.payload.accessTokenExpiry;

      },
      handleLogout: () => {
         clearCookie();
         // remove all local storage
         if (typeof window !== 'undefined') {
            window?.localStorage.clear();
         }
      },
   },
});

export const { handleRegister, refreshAccessTokenSlice, loginSlice, handleLogout } =
   authSlice.actions;
export default authSlice.reducer;
