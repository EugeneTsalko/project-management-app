import { ColumnInterface } from 'api/currentBoard/columnsApi.types';
import { TaskInterface } from 'api/currentBoard/tasksApi.types';
import { DropResult } from 'react-beautiful-dnd';

export const reorderList = ({ source, destination }: DropResult, data: ColumnInterface[] | TaskInterface[]) => {
  if (!destination) return;

  if (destination.droppableId === source.droppableId && destination.index === source.index) {
    return;
  }

  const items = Array.from(data);
  const [reorderData] = items.splice(source.index, 1);
  items.splice(destination.index, 0, reorderData);

  const reorderedItems = items.map(({ _id }, index) => {
    return { _id, order: index + 1 };
  });

  return { items, reorderedItems };
};
