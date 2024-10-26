import { createSignal, createEffect } from "solid-js";
import "./todo.css";

type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

type APITodo = {
  task: string;
  isComplete: boolean;
  id: number;
};

const TodoApp = () => {
  const [todos, setTodos] = createSignal([] as Todo[]);

  const fetchTodos = async () => {
    const fetchPromise = await fetch("http://localhost:3001/todos");
    const { todos }: { todos: APITodo[] } = await fetchPromise.json();
    console.log(todos);
    const newTodos = todos.map((todo) => ({
      text: todo.task,
      completed: todo.isComplete,
      id: todo.id,
    }));
    setTodos(newTodos);
  };

  createEffect(() => {
    fetchTodos();
  });

  const addTodo = async (e: SubmitEvent) => {
    const form = e.target as HTMLFormElement;
    e.preventDefault();
    const formData = new FormData(form);
    const newTodo = { text: formData.get("newTodo"), completed: false };

    const response = await fetch("http://localhost:3001/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (response.ok) {
      form.reset();
      fetchTodos();
    }
  };

  const deleteTodo = async (id: number) => {
    const response = await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      fetchTodos();
    }
  };

  const toggleTodo = async (id: number) => {
    // call api
    const response = await fetch(`http://localhost:3001/todos/${id}/toggle`, {
      method: "POST",
    });

    if (response.ok) {
      fetchTodos();
    }
  };

  return (
    <div class="todo-app">
      <h2>Todos</h2>
      <form onSubmit={addTodo}>
        <input name="newTodo" type="text" placeholder="Add a new todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos().map((todo) => (
          <li>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <p class={todo.completed ? "done" : "not-done"}>{todo.text}</p>
            <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
