import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { BoardColumn } from 'components/BoardColumn/BoardColumn';
import { CreateNewColumn } from './ModalWindows/CreateNewColumn';
import LoaderSpinner from 'components/LoaderSpinner';
import { Button } from 'components/Button/Button';
import { getColumns as getColumnsAPI, getAllTasks as getAllTasksAPI } from 'api/currentBoard';
import { setColumns, setColumns as setColumnsAction, setTasks as setTasksAction } from 'store/slices/currentBoardSlice';
import { ColumnInterface } from 'api/currentBoard/index.types';
import { useTranslation } from 'react-i18next';
import { RootState } from 'store/store';
import styles from './BoardPage.module.scss';

import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import API from 'api/base';
import { reorderList } from 'utils/reorderList';
import SearchBar from 'components/searchBar';

const BoardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const allBoards = useSelector((state: RootState) => state.boards.boards);
  const boardColumns = useSelector((state: RootState) => state.currentBoard.columns);
  const { boardId } = useParams();
  const currentBoard = allBoards.find((board) => board._id === (boardId as string));

  const [isLoading, setIsLoading] = useState(true);
  const [createColumnModalWindow, setCreateColumnModalWindow] = useState(false);

  const loadBoard = async () => {
    setIsLoading(true);

    if (!currentBoard) {
      navigate('/boards');
      return;
    }

    const columns = await getColumnsAPI(boardId as string);
    const sortedColumns = columns?.sort((a, b) => a.order - b.order);
    if (sortedColumns) {
      dispatch(setColumnsAction(sortedColumns));

      const tasks = await getAllTasksAPI(sortedColumns);
      if (tasks) {
        dispatch(setTasksAction(tasks));
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadBoard();
  }, []);

  if (isLoading) {
    return <LoaderSpinner full={true} />;
  }

  const dndHandler = async (result: DropResult) => {
    const list = reorderList(result, boardColumns);

    if (list) {
      dispatch(setColumns(list.items));
      await API.patch(`/columnsSet`, list.reorderedItems);
    }
  };

  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <h2 className={styles.boardTitle}>{currentBoard?.title}</h2>
          <Button text={t('Close Board')} type="button" style="closeBoard" onClick={() => navigate(-1)} />
          <SearchBar />
          <Button
            text={t('Create column')}
            type="button"
            style="createColumn"
            onClick={() => setCreateColumnModalWindow(true)}
          />
        </header>
        <DragDropContext onDragEnd={dndHandler}>
          <Droppable droppableId="column" direction="horizontal">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.columnList}>
                {boardColumns.map((item: ColumnInterface, index) => (
                  <Draggable key={item._id} draggableId={item._id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        key={index}
                      >
                        <BoardColumn data={item} boardId={boardId as string} />
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </main>
      {createColumnModalWindow && (
        <CreateNewColumn
          setState={setCreateColumnModalWindow}
          boardId={boardId as string}
          columnsLength={boardColumns.length}
        />
      )}
    </>
  );
};

export { BoardPage };
