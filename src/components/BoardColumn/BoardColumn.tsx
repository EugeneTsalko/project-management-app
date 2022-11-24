import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { BoardTask } from './BoardTask/BoardTask';
import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { removeColumn as removeColumnAPI, ColumnInterface, createTask as createTaskAPI } from 'api/boards';
import { removeColumn as removeColumnAction, createTask as createTaskAction } from 'store/dataSlice';
import { ModalWindowModification } from './BoardColumn.type';
import { StateInterface } from 'store/store.types';
import styles from './BoardColumn.module.scss';

import { token, userId } from 'api/token';

const INITIAL_STATE = {
  isConfirmationModalWindow: false,
  isModificationModalWindow: false,
};

const BoardColumn = ({ data }: { data: ColumnInterface }) => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: StateInterface) => state.data.currentBoard);
  const [state, setState] = useState(INITIAL_STATE);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ModalWindowModification>({ reValidateMode: 'onSubmit' });

  const taskTitleValidate = { required: true, minLength: 3, maxLength: 70 };
  const taskDescriptionValidate = { required: true, minLength: 3, maxLength: 150 };

  const createTask = async (value: ModalWindowModification) => {
    const responseData = await createTaskAPI(
      currentBoard.id,
      data.id,
      value.taskTitle,
      value.taskDescription,
      userId,
      token
    );
    dispatch(createTaskAction(responseData));
    setState({ ...state, isModificationModalWindow: false });
    resetField('taskTitle');
    resetField('taskDescription');
  };

  const removeColumn = () => {
    dispatch(removeColumnAction(data.id));
    removeColumnAPI(currentBoard.id, data.id, token);
  };

  const confirmationActions = {
    confirmAction: removeColumn,
    closeWindow: () => setState({ ...state, isConfirmationModalWindow: false }),
  };

  const modificationActions = {
    confirmAction: handleSubmit(createTask),
    closeWindow: () => {
      setState({ ...state, isModificationModalWindow: false });
      resetField('taskTitle');
      resetField('taskDescription');
    },
  };

  return (
    <>
      <div className={styles.column}>
        <h3 className={styles.columnTitle}>{data.title}</h3>
        <div className={styles.taskContainer}>
          {data.tasks.map((item) => (
            <BoardTask key={item.id} data={item} />
          ))}
        </div>
        <div className={styles.columnControl}>
          <button
            className={styles.deleteColumnButton}
            type="button"
            aria-label="Delete column"
            onClick={() => setState({ ...state, isConfirmationModalWindow: true })}
          >
            X
          </button>
          <button
            className={styles.createTaskButton}
            type="button"
            aria-label="Create task"
            onClick={() => setState({ ...state, isModificationModalWindow: true })}
          >
            Create task
          </button>
        </div>
      </div>
      {state.isConfirmationModalWindow && (
        <ModalWindow type="confirmation" actions={confirmationActions}>
          <p className="modalDescription">Column {data.title} will be removed.</p>
          <p className="modalDescription">Are you sure?</p>
        </ModalWindow>
      )}
      {state.isModificationModalWindow && (
        <ModalWindow type="modification" actions={modificationActions}>
          <p className="modalDescription">Create new task.</p>
          <input className="" type="text" id="taskTitle" {...register('taskTitle', taskTitleValidate)} />
          {errors.taskTitle && <p className="">Title must be more than 3 characters and less than 70.</p>}
          <input
            className=""
            type="text"
            id="taskDescription"
            {...register('taskDescription', taskDescriptionValidate)}
          />
          {errors.taskDescription && <p className="">Title must be more than 3 characters and less than 150.</p>}
        </ModalWindow>
      )}
    </>
  );
};

export { BoardColumn };
