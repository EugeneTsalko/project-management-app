import { IFetchedBoards } from 'api/boards/index.types';

export interface BoardsState {
  boards: IFetchedBoards[];
  error: string;
  status: 'Pending' | 'Fulfilled' | 'Rejected';
  isFormBoardModal: boolean;
}
