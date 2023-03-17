import { useStore } from "effector-react";
import { $todosStore, todosEvents } from "../stores/todos";

const TodoList: React.FC = () => {
  const todoStore = useStore($todosStore);

  return (
    <div>
      <button onClick={() => todosEvents.addTodo({ todo: { name: "new" } })}>
        Add
      </button>
      <button onClick={() => todosEvents.clearTodos()}>reset</button>
      <ul>
        {todoStore.list.map((todo, index) => {
          return <li key={index}>{todo.name}</li>;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
