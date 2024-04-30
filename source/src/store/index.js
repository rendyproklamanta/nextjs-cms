import { configureStore } from '@reduxjs/toolkit';
import layout from '@/src/store/slices/layoutSlice';
import auth from '@/src/store/slices/authSlice';
import { pokemonApi } from './api/pokemonApi';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';

const store = configureStore({
   reducer: {
      layout,
      auth,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
   },
   devTools: process.env.NODE_ENV !== 'production',
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         immutableCheck: false,
         serializableCheck: false,
      }).concat([
         pokemonApi.middleware,
         authApi.middleware,
         userApi.middleware,
      ]),
});

export default store;
