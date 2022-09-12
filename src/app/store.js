import { configureStore } from '@reduxjs/toolkit';
import productReducers from '../features/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducers
  },
});
