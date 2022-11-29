import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { boardsReducer } from './slices/boards';
import currentBoardReducer from './slices/currentBoardSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    boards: boardsReducer,
    currentBoard: currentBoardReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
