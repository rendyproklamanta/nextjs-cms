import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { clearCookie } from '@/src/utils/cookies';

// const initialUsers = () => {
//    if (typeof window !== "undefined") {
//       const item = window?.localStorage.getItem("users");
//       return item
//          ? JSON.parse(item)
//          : [
//             {
//                id: uuidv4(),
//                name: "dashcode",
//                email: "dashcode@gmail.com",
//                password: "dashcode",
//             },
//          ];
//    }
//    return [
//       {
//          id: uuidv4(),
//          name: "dashcode",
//          email: "dashcode@gmail.com",
//          password: "dashcode",
//       },
//    ];
// };
// // save users in local storage

const initialAccessToken = () => {
   if (typeof window !== 'undefined') {
      const item = window?.localStorage.getItem('accessToken');
      return item !== 'undefined' ? JSON.parse(item) : false;
   }
   return false;
};

const initialRefreshToken = () => {
   if (typeof window !== 'undefined') {
      const item = window?.localStorage.getItem('refreshToken');
      return item !== 'undefined' ? JSON.parse(item) : false;
   }
   return false;
};

const initialUser = () => {
   if (typeof window !== 'undefined') {
      const item = window?.localStorage.getItem('userinfo');
      return item !== 'undefined' ? JSON.parse(item) : false;
   }
   return false;
};

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      userinfo: initialUser(),
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

      loginSlice: (state, action) => {
         state.accessToken = action.payload.accessToken;
         // save in local storage
         if (typeof window !== 'undefined') {
            window?.localStorage.setItem('accessToken', JSON.stringify(state.accessToken));
         }
      },
      refreshAccessTokenSlice: (state, action) => {
         state.accessToken = action.payload;
         // save in local storage
         if (typeof window !== 'undefined') {
            window?.localStorage.setItem('accessToken', JSON.stringify(state.accessToken));
         }
      },
      handleLogout: () => {
         clearCookie();
         // remove from local storage
         if (typeof window !== 'undefined') {
            window?.localStorage.removeItem('accessToken');
         }
      },
   },
});

export const { handleRegister, refreshAccessTokenSlice, loginSlice, handleLogout } =
   authSlice.actions;
export default authSlice.reducer;
