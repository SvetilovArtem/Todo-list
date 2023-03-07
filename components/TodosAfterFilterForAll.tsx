import { Todo } from "@/types/TodoType";
import React from "react";
import NotTodos from "./NotTodos";
import TodoItem from "./TodoItem";

interface ITodosAfterFilterNotForAllProps {
  todosAfterFilterNotForAll: Todo[];
  todosFromFirebase: Todo[];
  isActiveCategory: string;
  todosCompleted: string[];
  updateTaskCompletedHandler: (id: string, completed: boolean) => void;
  deleteTaskHandler: (id: string) => void;
}

const TodosAfterFilterForAll = ({
  todosFromFirebase,
  todosCompleted,
  updateTaskCompletedHandler,
  deleteTaskHandler,
}: ITodosAfterFilterNotForAllProps) => {
  return (
    <>
      {todosFromFirebase.length !== 0 ? (
        todosFromFirebase.map((todo) => (
          <TodoItem
            todo={todo}
            todosCompleted={todosCompleted}
            updateTaskCompletedHandler={updateTaskCompletedHandler}
            deleteTaskHandler={deleteTaskHandler}
          />
        ))
      ) : (
        <NotTodos />
      )}
      <div>Total: {todosFromFirebase.length} / Compteted: {Math.round((todosCompleted.length / todosFromFirebase.length) * 100)}%</div>
    </>
  );
};

export default TodosAfterFilterForAll;
