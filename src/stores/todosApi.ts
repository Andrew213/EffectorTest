import { createApi, createEffect, createEvent, createStore } from "effector";

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
  .on(eventPrepend, (store) => store)
  .on(addTodo, (store, payload) => ({
    ...store,
    list: [...store.list, payload.todo],
  }))
  .on(fetchFx.doneData, (store, payload) => {
    return {
      ...store,
      list: [
        ...store.list,
        { title: payload.title },
        // ...payload.map((el: { title: string }) => ({ title: el.title })),
      ],
    };
  })
  //   .on(fetchFx.pending, (store, payload) => {
  //     console.log(`panding`);
  //     return store;
  //   })
  .on(deleteTodo, (store, payload) => ({
    ...store,
    list: store.list.filter((_, index) => payload.index !== index),
  }))
  .reset(clearTodos);

const lastTodo = $todosStore.map(
  (store) => store.list[store.list.length - 1] ?? null
);

fetchFx.pending.watch((pending) => {
  console.log(`effect is pending? `, `${pending ? "yes" : "no"}`);
});

lastTodo.watch((todo) => {
  // if error use createError
  //   console.log(`currentState `, $todosStore.getState());
  //   console.log(`new todo `, todo);
});

// export const todoApi = createApi($todosStore, {
//   addTodo: (store, todo: Todo) => ({
//     ...store,
//     list: [...store.list, todo],
//   }),
// });

setTimeout(async () => {
  await fetchFx({ id: 1 });
}, 3000);
