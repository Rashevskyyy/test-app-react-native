import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from './slices/gallarySlice.ts';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
