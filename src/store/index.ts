import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";

const store = configureStore({
  reducer: {
    booksSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
