import { deleteTask } from '@/firebase/firebase'
import { AppDispatch, RootState } from '@/redux/store'
import { setIsOpenModalTaslDelete, setTodosFromFirebase } from '@/redux/todoSlice'
import { Todo } from '@/types/TodoType'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from '../styles/ModalTaskDelete.module.scss'

interface IModalTaskDelete {
  todo: Todo,
  selectTodo: string,
  setSelectTodo: (id:string) => void
}

const ModalTaskDelete = ({ todo, selectTodo, setSelectTodo }:IModalTaskDelete) => {
  const dispatch:AppDispatch = useDispatch()
  const todosFromFirebase = useSelector(
    (state: RootState) => state.todoReducer.todosFromFirebase
  );


  const deleteTaskHandler = (id: string) => {
    deleteTask(id);
    dispatch(
      setTodosFromFirebase(todosFromFirebase.filter((todo) => todo.id !== id))
    );
  };
  
  return (
    <div className={styles.modal}>
        <div className={styles.closeButton} onClick={() => {
          dispatch(setIsOpenModalTaslDelete(false))
        }}>&#10060;</div>
        <div className={styles.title}>Are you sure remove '{todo.title}' ?</div>
        <button type='button' className={styles.okButton} onClick={() => {
          if(todo.id === selectTodo) {
            dispatch(setIsOpenModalTaslDelete(true))
            deleteTaskHandler(todo.id)
          }
        }}>ok</button>
    </div>
  )
}

export default ModalTaskDelete