import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const TodosCompleted = () => {
  const isAuth = useSelector((state: RootState) => state.todoReducer.isAuth);
  const todos = useSelector((state: RootState) => state.todoReducer.todosFromFirebase);
  const todosCompleted = todos.filter(todo => todo.completed === true)
  return isAuth ? (
    <div>Completed: {todosCompleted.map(todo => <div>{todo.title}, {todo.category}, {todo.isImportant ? 'important' : 'not important'}</div>)}</div>
  ) : (
    <div>Доступно только авторизованным пользователям</div>
  );
};

export default TodosCompleted;
