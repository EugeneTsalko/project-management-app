import { createSlice } from '@reduxjs/toolkit';
import { createBoard, getBoardsList } from 'api/boards';
import { BoardsState } from './index.types';

const initialState: BoardsState = {
  boards: [],
  error: '',
  status: 'Pending',
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getBoardsList.pending, (state) => {
        state.status = 'Pending';
        state.boards = [];
        state.error = '';
      })
      .addCase(getBoardsList.fulfilled, (state, action) => {
        state.boards = action.payload;
        state.status = 'Fulfilled';
      })
      .addCase(getBoardsList.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
        state.status = 'Rejected';
      });

    builder
      .addCase(createBoard.pending, (state) => {
        state.status = 'Pending';
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.boards = state.boards.concat(action.payload);
        state.status = 'Fulfilled';
      })
      .addCase(createBoard.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message;
        }
        state.status = 'Rejected';
      });
  },
});

// export const {} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
