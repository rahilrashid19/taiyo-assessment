import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "../slices/contactSlice";

const store = configureStore({
  reducer: {
    contactSlice: contactSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
