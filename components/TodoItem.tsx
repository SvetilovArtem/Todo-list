import { AppDispatch, RootState } from "@/redux/store";
import { setIsOpenModalTaslDelete } from "@/redux/todoSlice";
import { Todo } from "@/types/TodoType";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalTaskDelete from "./ModalTaskDelete";
import TodoDescTooltip from "./TodoDescTooltip";

import styles from '../styles/Todo.module.scss'

interface ITodoItemProps {
  todo: Todo,
  todosCompleted: string[],
  updateTaskCompletedHandler: (id:string, completed:boolean) => void,
  selectTodo: string,
  setSelectTodo: (id:string) => void,
  desc: string,
  setDesc: (desc:string) => void
}

const TodoItem = ({ todo, todosCompleted, updateTaskCompletedHandler, selectTodo, setSelectTodo, desc, setDesc }:ITodoItemProps) => {
  const dispatch:AppDispatch = useDispatch()
  const isOpenModal = useSelector((state:RootState) => state.todoReducer.isOpenModalTaskDelete)
  const [isShowTodoDesc, setIsShowTodoDesc] = useState(false)

  const onMouseEnterHandler = () => {
    setDesc(todo.desc)
    setIsShowTodoDesc(true)
  }
  const onMouseLeaveHandler = () => {
    setDesc('')
    setIsShowTodoDesc(false)
  }

  return (
    <div
      className={
        todosCompleted.includes(todo.id)
          ? styles.todo + " " + "line-through"
          : styles.todo
      }
    >
      <div key={todo.id} onMouseMove={onMouseEnterHandler} onMouseLeave={onMouseLeaveHandler}>
        {todo.title}
        <span className="text-red-600 text-[8px]">
          (deadline: {todo.deadline})
        </span>
      </div>
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
          }}
        >
          delete
        </button>
      </div>
      {(isOpenModal && todo.id === selectTodo) && <ModalTaskDelete todo={todo} selectTodo={selectTodo} setSelectTodo={setSelectTodo} />}
      {(isShowTodoDesc && todo.desc === desc) && <TodoDescTooltip description={todo.desc} />}
    </div>
  );
};

export default TodoItem;
