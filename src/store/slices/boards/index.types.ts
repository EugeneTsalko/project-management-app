import { IBoards } from 'api/boards/index.types';

export interface BoardsState {
  boards: IBoards[];
  error: string;
  status: 'Pending' | 'Fulfilled' | 'Rejected';
}
