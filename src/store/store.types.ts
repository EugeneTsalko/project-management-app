import { Board } from 'api/boardsApi.types';

export interface State {
  data: Data;
}

interface Data {
  currentBoard: Board;
}
