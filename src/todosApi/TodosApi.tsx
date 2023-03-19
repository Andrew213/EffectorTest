// import { useList, useStore } from "effector-react";
// // import { $data } from "../animations/domain";
// // import { $errorStore } from "../animations/errors";
// // import { todosEvents } from "../animations/todos";
// import {
//   $todosStore,
//   clearTodos,
//   deleteTodo,
//   todoApi,
//   addTodo,
//   $todoList,
// } from "../animations/sample";
// import { useState } from "react";

// const TodosApi: React.FC = () => {
//   const todoStore = useStore($todosStore);
//   const errStore = useStore($errorStore);
//   const [value, setValue] = useState<string>("");

//   const todos = useList($todoList, (todo, index) => {
//     console.log(1);
//     return (
//       <li onClick={() => deleteTodo({ index })} key={index}>
//         {todo.title}
//       </li>
//     );
//   });
//   console.log(2);

//   return (
//     <div>
//       <input
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//       />
//       <button onClick={() => addTodo({ todo: { title: value } })}>Add</button>
//       <button onClick={() => clearTodos()}>reset</button>
//       <div>{errStore?.error && errStore.error}</div>
//       <ul>{todos}</ul>
//     </div>
//   );
// };

// export default TodosApi;
export {};
