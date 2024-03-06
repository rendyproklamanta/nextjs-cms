import { configureStore } from "@reduxjs/toolkit";
import layout from "@/src/store/slices/layoutSlice";
import auth from "@/src/store/slices/authSlice";
import { pokemonApi } from "./api/pokemonApi";
import { authApi } from "./api/authApi";
import { patientApi } from "./api/patientApi";
import { userApi } from "./api/userApi";
import { diagnosisApi } from "./api/diagnosisApi";
import { pmbApi } from "./api/pmbApi";
import { addressApi } from "./api/addressApi";
import { antenatalApi } from "./api/antenatalApi";
import { preeklampsiaApi } from "./api/preeklampsiaApi";
import { medicalApi } from "./api/medicalApi";

const store = configureStore({
   reducer: {
      layout,
      auth,
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [authApi.reducerPath]: authApi.reducer,
      [patientApi.reducerPath]: patientApi.reducer,
      [preeklampsiaApi.reducerPath]: preeklampsiaApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      [diagnosisApi.reducerPath]: diagnosisApi.reducer,
      [pmbApi.reducerPath]: pmbApi.reducer,
      [addressApi.reducerPath]: addressApi.reducer,
      [antenatalApi.reducerPath]: antenatalApi.reducer,
      [medicalApi.reducerPath]: medicalApi.reducer,
   },
   devTools: process.env.NODE_ENV !== "production",
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         immutableCheck: false,
         serializableCheck: false,
      }).concat([
         pokemonApi.middleware,
         authApi.middleware,
         patientApi.middleware,
         preeklampsiaApi.middleware,
         userApi.middleware,
         diagnosisApi.middleware,
         pmbApi.middleware,
         addressApi.middleware,
         antenatalApi.middleware,
         medicalApi.middleware,
      ]),
});

export default store;
