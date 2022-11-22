import { BoardInterface } from 'api/boards';

export interface StateInterface {
  data: DataInterface;
}

interface DataInterface {
  currentBoard: BoardInterface;
}
