import { configureStore } from '@reduxjs/toolkit';

import dataReducer from './slices/currentBoardSlice';

export const store = configureStore({
  reducer: {
    currentBoard: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
