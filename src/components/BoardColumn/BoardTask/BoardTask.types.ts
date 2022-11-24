import { TaskInterface } from 'api/boards';

export interface BoardTaskProps {
  data: TaskInterface;
  boardId: string;
  columnId: string;
}
