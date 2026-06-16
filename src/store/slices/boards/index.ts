import { createSlice } from '@reduxjs/toolkit';
import { createBoard, deleteBoard, getBoardById, getBoardsList, updateBoard } from 'api';
import { BoardsState } from './index.types';

const initialState: BoardsState = {
  boards: [],
  error: '',
  status: 'Pending',
  isFormBoardModal: false,
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

    builder
      .addCase(getBoardById.pending, (state) => {
        state.status = 'Pending';
        state.boards = [];
      })
      .addCase(getBoardById.fulfilled, (state, action) => {
        state.status = 'Fulfilled';
        state.boards = state.boards.concat(action.payload);
      })
      .addCase(getBoardById.rejected, (state, action) => {
        state.status = 'Rejected';
        if (action.payload) {
          state.error = action.payload.message;
        }
      });

    builder.addCase(deleteBoard.fulfilled, (state, action) => {
      state.boards = state.boards.filter((obj) => obj._id !== action.meta.arg);
      state.status = 'Fulfilled';
    });

    builder
      .addCase(updateBoard.pending, (state) => {
        state.status = 'Pending';
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        const oldBoard = state.boards.findIndex((obj) => obj._id === action.meta.arg.id);
        Object.assign(state.boards[oldBoard], action.payload);
        state.status = 'Fulfilled';
      });
  },
});

// export const {} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;
