import {
  createApi,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

type Todo = {
  title: string;
};

type TodoStore = {
  list: Todo[];
};

//events

export const addTodo = createEvent<{ todo: Todo }>();
export const clearTodos = createEvent();
export const deleteTodo = createEvent<{ index: number }>();

// effects

// const targetFx = createEffect(async (id: string) => {
//   // console.log(`params1`, params);
// });

const targetFx = createEffect(async (params: Todo): Promise<Todo> => {
  console.log(`params1`, params);
  const url = `https://jsonplaceholder.typicode.com/todos/${params.title}`;
  const req = await fetch(url);
  return req.json();
});

const fetchFx = createEffect(async ({ id }: { id: number }): Promise<Todo> => {
  const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
  const req = await fetch(url);
  return req.json();
});

fetchFx.done.watch(({ params, result }) => {
  console.log(`result `, result);
});

const eventPrepend = fetchFx.prepend((params: { id: number }) => {
  console.log(`prepend `, params);
  return { id: 2 };
});

const INITIAL_TODOS_STORE = [{ title: "clean" }];

//store

export const $todosStore = createStore<TodoStore>({
  list: INITIAL_TODOS_STORE,
})
  // .on(addTodo, (store, payload) => ({
  //   ...store,
  //   list: [...store.list, payload.todo],
  // }))
  //   .on(eventPrepend, (store) => store)
  //   .on(fetchFx.doneData, (store, payload) => {
  //     return {
  //       ...store,
  //       list: [
  //         ...store.list,
  //         { title: payload.title },
  //         // ...payload.map((el: { title: string }) => ({ title: el.title })),
  //       ],
  //     };
  //   })
  //   //   .on(fetchFx.pending, (store, payload) => {
  //   //     console.log(`panding`);
  //   //     return store;
  //   //   })
  // .on(deleteTodo, (store, payload) => ({
  //   ...store,
  //   list: store.list.filter((_, index) => payload.index !== index),
  // }))
  .reset(clearTodos);

export const todoApi = createApi($todosStore, {
  addTodo: (store, todo: Todo) => {
    console.log(`todo`, todo);
    return {
      ...store,
      list: [...store.list, todo],
    };
  },
});

sample({
  clock: addTodo,
  source: $todosStore,
  fn(store, payload) {
    console.log(`store `, store);
    console.log(`payload `, payload);
    return payload.todo;
  },
  target: targetFx,
});

export const $todoList = $todosStore.map((store) => store.list);

// const deleteTargetFx = createEffect((params: any) => {
//   console.log(`delete params `, params);
//   return params;
// });

sample({
  clock: deleteTodo,
  source: $todosStore,
  fn(store, payload) {
    console.log(`store fetch `, store);
    console.log(`payload fetch`, payload);
    return {
      ...store,
      list: store.list.filter((_, index) => payload.index !== index),
    };
    // return { title: payload.todo.title };
  },
  target: $todosStore,
});

sample({
  clock: targetFx.doneData,
  source: $todosStore,
  filter: (store) => true,
  fn(store, payload) {
    console.log(`store fetch `, store);
    console.log(`payload fetch`, payload);
    console.log(`333 `);
    return { ...store, list: [...store.list, payload] };
    // return { title: payload.todo.title };
  },
  target: $todosStore,
});
