import { Todo } from "@/types/TodoType";
import React from "react";

interface TodoProps {
  todo: Todo;
}

const Todo = ({ todo }: TodoProps) => {
  
  return (
    <>
      {todo ? (
        <div>
          <div>{todo.title}</div>
          <div>{todo.category}</div>
          <div>{todo.desc}</div>
        </div>
      ) : (
        "empty item"
      )}
    </>
  );
};

export default Todo;
