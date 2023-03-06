import { Todo } from "@/types/TodoType";
import Link from "next/link";
import React from "react";

import styles from "../styles/Todos.module.scss";
import NotTodos from "./NotTodos";

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
    <div>
      {todosAfterFilterNotForAll.length !== 0 ? (
        todosFromFirebase
          .filter((todo) => isActiveCategory === todo.category)
          .map((todo) => (
            <div
              className={
                todosCompleted.includes(todo.id)
                  ? styles.todo + " " + "line-through"
                  : styles.todo
              }
              onMouseEnter={() => {}}
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
                  onClick={() =>
                    updateTaskCompletedHandler(todo.id, todo.completed)
                  }
                >
                  done
                </button>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => deleteTaskHandler(todo.id)}
                >
                  delete
                </button>
              </div>
            </div>
          ))
      ) : (
        <NotTodos />
      )}
    </div>
  );
};

export default TodosAfterFilterNotForAll;
