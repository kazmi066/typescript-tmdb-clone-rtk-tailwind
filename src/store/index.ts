import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import movieReducer from "./movie/movieSlice";

const store = configureStore({
  reducer: {
    movie: movieReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
