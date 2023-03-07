import { Todo } from "@/types/TodoType";
import Link from "next/link";
import React from "react";

import styles from "../styles/Todos.module.scss";
import NotTodos from "./NotTodos";
import TodoItem from "./TodoItem";

interface ITodosAfterFilterNotForAllProps {
    todosAfterFilterNotForAll: Todo[],
    todosFromFirebase: Todo[],
    isActiveCategory: string,
    todosCompleted: string[],
    updateTaskCompletedHandler: (id:string, completed:boolean) => void,
    deleteTaskHandler: (id: string) => void,
}

const TodosAfterFilterNotForAll = ({
  todosAfterFilterNotForAll,
  todosFromFirebase,
  isActiveCategory,
  todosCompleted,
  updateTaskCompletedHandler,
  deleteTaskHandler,
}:ITodosAfterFilterNotForAllProps) => {
  return (
    <>
      {todosAfterFilterNotForAll.length !== 0 ? (
        todosFromFirebase
          .filter((todo) => isActiveCategory === todo.category)
          .map((todo) => (
            <TodoItem todo={todo} todosCompleted={todosCompleted} updateTaskCompletedHandler={updateTaskCompletedHandler} deleteTaskHandler={deleteTaskHandler} />
          ))
      ) : (
        <NotTodos />
      )}
    </>
  );
};

export default TodosAfterFilterNotForAll;
