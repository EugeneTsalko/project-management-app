import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import { ModalWindow } from 'components/ModalWindow/ModalWindow';
import { createTask as createTaskAPI } from 'api/boards';
import { createTask as createTaskAction } from 'store/dataSlice';
import { StateInterface } from 'store/store.types';
import { ModalWindowProps, ModalWindowModification } from './CreateNewTask.types';
// import styles from './CreateNewTask.types';

import { token, userId } from 'api/token';

const CreateNewTask = ({ setState, columnData }: ModalWindowProps) => {
  const dispatch = useDispatch();
  const currentBoard = useSelector((state: StateInterface) => state.data.currentBoard);

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
      columnData.id,
      value.taskTitle,
      value.taskDescription,
      userId,
      token
    );
    dispatch(createTaskAction(responseData));
    setState(false);
    resetField('taskTitle');
    resetField('taskDescription');
  };

  const modificationActions = {
    confirmAction: handleSubmit(createTask),
    closeWindow: () => {
      setState(false);
      resetField('taskTitle');
      resetField('taskDescription');
    },
  };

  return (
    <ModalWindow type="modification" actions={modificationActions}>
      <p className="modalDescription">Create new task.</p>
      <input className="" type="text" id="taskTitle" {...register('taskTitle', taskTitleValidate)} />
      {errors.taskTitle && <p className="">Title must be more than 3 characters and less than 70.</p>}
      <input className="" type="text" id="taskDescription" {...register('taskDescription', taskDescriptionValidate)} />
      {errors.taskDescription && <p className="">Title must be more than 3 characters and less than 150.</p>}
    </ModalWindow>
  );
};

export { CreateNewTask };
