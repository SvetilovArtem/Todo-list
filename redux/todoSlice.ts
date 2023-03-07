import { Todo } from "@/types/TodoType";
import { createSlice } from "@reduxjs/toolkit";

export interface TodoState {
  isAuth: boolean;
  authUser: {
    authUserName: string,
    authUserEmail: string,
    authUserPhoto: string,
    isAuth: boolean
  }
  todos: Todo[];
  todosIdList: string[];
  isActiveCategory: string;
  todosFromFirebase: Todo[];
  todosCompleted: string[];
}

const initialState: TodoState = {
  isAuth: false,
  authUser: {
    authUserName: '',
    authUserEmail: '',
    authUserPhoto: '',
    isAuth: false
  },
  todos: [],
  todosIdList: [],
  isActiveCategory: "all",
  todosFromFirebase: [],
  todosCompleted: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setAuthUser: (state, action) => {
      state.authUser = {
        authUserName: action.payload.displayName,
        authUserEmail: action.payload.email,
        authUserPhoto: action.payload.photoURL,
        isAuth: action.payload.displayName ? true : false
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    setTodosIdList: (state, action) => {
      state.todosIdList = action.payload;
    },
    setIsActiveCategory: (state, action) => {
      state.isActiveCategory = action.payload;
    },
    setTodosFromFirebase: (state, action) => {
      state.todosFromFirebase = action.payload;
    },
    setTodosCompleted: (state, action) => {
      state.todosCompleted.push(action.payload);
    },
    deleteTodosCompleted: (state, action) => {
      state.todosCompleted = state.todosCompleted.filter(todo => todo !== action.payload)
    }
  },
});

export const {
  setIsAuth,
  setAuthUser,
  setTodos,
  setTodosIdList,
  setIsActiveCategory,
  setTodosFromFirebase,
  setTodosCompleted,
  deleteTodosCompleted
} = todoSlice.actions;

export default todoSlice.reducer;
