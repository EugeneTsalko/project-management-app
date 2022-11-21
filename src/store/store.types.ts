import { Board } from 'api/boards/boardsApi.types';

export interface State {
  data: Data;
}

interface Data {
  currentBoard: Board;
}
