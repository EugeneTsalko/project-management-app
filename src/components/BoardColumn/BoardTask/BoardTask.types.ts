import { TaskInterface } from 'api/currentBoard/index.types';

export interface BoardTaskProps {
  data: TaskInterface;
  boardId: string;
  columnId: string;
}
