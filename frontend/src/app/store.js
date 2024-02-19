import { configureStore } from '@reduxjs/toolkit';
import modelReduce from '../features/models/modelSlice'

export const store = configureStore({
  reducer: {
    models: modelReduce
  },
});
