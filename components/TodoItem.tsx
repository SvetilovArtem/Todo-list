import { AppDispatch, RootState } from "@/redux/store";
import { setIsOpenModalTaslDelete } from "@/redux/todoSlice";
import { Todo } from "@/types/TodoType";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from '../styles/Todo.module.scss'
import ModalTaskDelete from "./ModalTaskDelete";

interface ITodoItemProps {
  todo: Todo,
  todosCompleted: string[],
  updateTaskCompletedHandler: (id:string, completed:boolean) => void,
  deleteTaskHandler: (id: string) => void,
  selectTodo: string,
  setSelectTodo: (id:string) => void
}

const TodoItem = ({ todo, todosCompleted, updateTaskCompletedHandler, deleteTaskHandler, selectTodo, setSelectTodo }:ITodoItemProps) => {
  const dispatch:AppDispatch = useDispatch()
  const isOpenModal = useSelector((state:RootState) => state.todoReducer.isOpenModalTaskDelete)

  return (
    <div
      className={
        todosCompleted.includes(todo.id)
          ? styles.todo + " " + "line-through"
          : styles.todo
      }
    >
      <Link href={`/todos/${todo.id}`} key={todo.id}>
        {todo.title}
        <span className="text-red-600 text-[8px]">
          (deadline: {todo.deadline})
        </span>
      </Link>
      <div className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.doneBtn}
          onClick={() => updateTaskCompletedHandler(todo.id, todo.completed)}
        >
          done
        </button>
        <button
          type="button"
          className={styles.deleteBtn}
          onClick={() => {
            setSelectTodo(todo.id)
            dispatch(setIsOpenModalTaslDelete(true))
            // deleteTaskHandler(todo.id)
          }}
        >
          delete
        </button>
      </div>
      {(isOpenModal && todo.id === selectTodo) && <ModalTaskDelete todo={todo} selectTodo={selectTodo} setSelectTodo={setSelectTodo} />}
    </div>
  );
};

export default TodoItem;
