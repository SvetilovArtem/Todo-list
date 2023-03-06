import Link from "next/link";
import React from "react";

const Todo = ({ todo, todosCompleted, updateTaskCompletedHandler, deleteTaskHandler }) => {
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
          onClick={() => deleteTaskHandler(todo.id)}
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
