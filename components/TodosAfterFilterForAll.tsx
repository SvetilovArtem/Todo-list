import { Todo } from "@/types/TodoType";
import React, { useState } from "react";
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
  const [selectTodo, setSelectTodo] = useState('')
  const [todoTooltipDesc, setTodoTooltipDesc] = useState('')
  return (
    <>
      {todosFromFirebase.length !== 0 ? (
        todosFromFirebase.map((todo) => (
          <TodoItem
            todo={todo}
            selectTodo={selectTodo}
            setSelectTodo={setSelectTodo}
            todosCompleted={todosCompleted}
            updateTaskCompletedHandler={updateTaskCompletedHandler}
            desc={todoTooltipDesc}
            setDesc={setTodoTooltipDesc}
          />
        ))
      ) : (
        <NotTodos />
      )}
      <div>Total: {todosFromFirebase.length} / Completed: {Math.round((todosCompleted.length / todosFromFirebase.length) * 100)}%</div>

    </>
  );
};

export default TodosAfterFilterForAll;
