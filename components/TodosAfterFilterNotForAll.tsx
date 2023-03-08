import { Todo } from "@/types/TodoType";
import React, { useState } from "react";
import NotTodos from "./NotTodos";
import TodoItem from "./TodoItem";

import styles from "../styles/Todos.module.scss";

interface ITodosAfterFilterNotForAllProps {
  todosAfterFilterNotForAll: Todo[];
  todosFromFirebase: Todo[];
  isActiveCategory: string;
  todosCompleted: string[];
  updateTaskCompletedHandler: (id: string, completed: boolean) => void;
  deleteTaskHandler: (id: string) => void;
}

const TodosAfterFilterNotForAll = ({
  todosAfterFilterNotForAll,
  todosFromFirebase,
  isActiveCategory,
  todosCompleted,
  updateTaskCompletedHandler,
  deleteTaskHandler,
}: ITodosAfterFilterNotForAllProps) => {
  const [selectTodo, setSelectTodo] = useState('')
  return (
    <>
      {todosAfterFilterNotForAll.length !== 0 ? (
        todosFromFirebase
          .filter((todo) => isActiveCategory === todo.category)
          .map((todo) => (
            <TodoItem
              todo={todo}
              setSelectTodo={setSelectTodo}
              selectTodo={selectTodo}
              todosCompleted={todosCompleted}
              updateTaskCompletedHandler={updateTaskCompletedHandler}
              deleteTaskHandler={deleteTaskHandler}
            />
          ))
      ) : (
        <NotTodos />
      )}
      <div>
        Total: {todosAfterFilterNotForAll.length}
      </div>
    </>
  );
};

export default TodosAfterFilterNotForAll;
