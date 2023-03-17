import { createEvent, createStore } from "effector";

type Todo = {
  name: string;
};

type TodoStore = {
  list: Todo[];
};

const addTodo = createEvent<{ todo: Todo }>();
const clearTodos = createEvent();

export const todosEvents = {
  addTodo,
  clearTodos,
};

export const $todosStore = createStore<TodoStore>({
  list: [{ name: "clean" }],
})
  .on(addTodo, (store, payload) => ({
    ...store,
    list: [...store.list, payload.todo],
  }))
  .reset(clearTodos);
