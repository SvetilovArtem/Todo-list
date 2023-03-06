import TodosAfterFilterNotForAll from "@/components/TodosAfterFilterNotForAll";
import { deleteTask, getTasksFromFirebase, updateTaskCompleted } from "@/firebase/firebase";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteTodosCompleted, setTodos, setTodosCompleted, setTodosFromFirebase, setTodosIdList } from "@/redux/todoSlice";
import { Todo } from "@/types/TodoType";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "../../styles/Todos.module.scss";
import Categories from "./categories";

const Todos = () => {
  const dispatch: AppDispatch = useDispatch();
  const todosFromFirebase = useSelector((state:RootState) => state.todoReducer.todosFromFirebase)
  const todosCompleted = todosFromFirebase.filter(todo => todo.completed === true).map(todo => todo.id)
  const isAuth = useSelector((state: RootState) => state.todoReducer.isAuth);
  const todos = useSelector((state: RootState) => state.todoReducer.todos);
  const todosIdList = useSelector(
    (state: RootState) => state.todoReducer.todosIdList
  );
  const isActiveCategory = useSelector(
    (state: RootState) => state.todoReducer.isActiveCategory
  );

  const todosAfterFilterNotForAll = todosFromFirebase.filter((todo) => isActiveCategory === todo.category)
  

  useEffect(() => {
    getTasksFromFirebase().then((resp) => {
      dispatch(setTodos(resp.todos));
      dispatch(setTodosIdList(resp.todosIdList));
    });
    dispatch(setTodosFromFirebase(todos.map((todo: Todo, index: number) => ({
      ...todo,
      id: todosIdList[index],
    }))))
    dispatch(setTodosCompleted(todosFromFirebase.filter(todo => todo.completed === true).map(todo => todo.id)))

  }, [todos]);

  const deleteTaskHandler = (id: string) => {
    deleteTask(id)
    dispatch(setTodosFromFirebase(todosFromFirebase.filter(todo => todo.id !== id)))
  }

  const updateTaskCompletedHandler = (id:string, completed:boolean) => { 
    updateTaskCompleted(id, completed)
    if(todosCompleted.includes(id)) {
      dispatch(deleteTodosCompleted(id))
    } else {
      dispatch(setTodosCompleted(id))
    }
    
  }

  return isAuth ? (
    <>
      <Categories />
      <div className={styles.todos}>
        {isActiveCategory !== "all"
          ? <TodosAfterFilterNotForAll 
              todosAfterFilterNotForAll={todosAfterFilterNotForAll} 
              todosFromFirebase={todosFromFirebase} 
              isActiveCategory={isActiveCategory} 
              todosCompleted={todosCompleted} 
              updateTaskCompletedHandler={updateTaskCompletedHandler} 
              deleteTaskHandler={deleteTaskHandler} 
            />
          : todosFromFirebase.length !== 0 ? todosFromFirebase.map((todo) => (
            <div className={todosCompleted.includes(todo.id) ? styles.todo + ' ' + 'line-through' : styles.todo}>
              <Link href={`/todos/${todo.id}`} key={todo.id}>
                {todo.title}
                <span className="text-red-600 text-[8px]">
                  {" "}
                  (deadline: {todo.deadline})
                </span>
              </Link>
              <div className={styles.buttonGroup}>
                  <button type="button" className={styles.doneBtn} onClick={() => updateTaskCompletedHandler(todo.id, todo.completed)}>done</button>
                  <button type="button" className={styles.deleteBtn} onClick={() => deleteTaskHandler(todo.id)}>
                    delete
                  </button>
                </div>
            </div>
          )) : <div>Not todos</div>}
      </div>
    </>
  ) : (
    <div>
      <div>Доступно только авторизованным пользователям</div>
    </div>
  );
};

export default Todos;
