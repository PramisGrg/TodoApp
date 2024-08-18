import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./components/TodoCard";
import { TTodo } from "./types";

function App() {
  const [alltodos, setAlltodos] = useState<TTodo[]>(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") as string);
    return savedTodos ? savedTodos : [];
  });
  const [todo, setTodo] = useState<TTodo>({
    id: "",
    title: "",
    description: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTodo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      setAlltodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === todo.id
            ? { ...item, title: todo.title, description: todo.description }
            : item
        )
      );
      setIsEditing(false);
    } else {
      const newTodo = {
        id: uuidv4(),
        title: todo.title,
        description: todo.description,
      };
      setAlltodos((prevTodos) => [newTodo, ...prevTodos]);
    }
    setTodo({
      id: "",
      title: "",
      description: "",
    });
  };

  const handleDelete = (id: string) => {
    setAlltodos(
      alltodos.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const handleEdit = (id: string) => {
    const todoToEdit = alltodos.find((item) => item.id === id) as TTodo;
    setTodo(todoToEdit);
    setIsEditing(true);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(alltodos));
  }, [alltodos]);

  return (
    <main className="max-w-[800px] container mx-auto">
      <form className="" onSubmit={handleSubmit}>
        <div className="my-[10px]">
          <label className="text-2xl">Todo Title</label>
          <input
            className="p-2 border border-gray-500 rounded-lg w-full"
            type="text"
            name="title"
            onChange={handleChange}
            value={todo.title}
            placeholder="What's your plan !!"
          />
        </div>
        <div className="my-[10px]">
          <label className="text-2xl">Todo Description</label>
          <input
            className="p-2 border border-gray-500 rounded-lg w-full"
            type="text"
            name="description"
            value={todo.description}
            onChange={handleChange}
            placeholder="Write a description"
          />
        </div>

        <button
          className="bg-blue-400 p-2 rounded-lg hover:scale-105
          hover:duration-300 text-white hover:text-gray-900"
          type="submit"
        >
          {isEditing ? "Update Todo" : "Add Todo"}
        </button>
      </form>

      <h1 className="text-center text-3xl font-bold mb-5">All Todos</h1>
      <div className="space-y-5">
        {alltodos.map((list) => {
          return (
            <TodoCard
              key={list.id}
              list={list}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          );
        })}
      </div>
    </main>
  );
}

export default App;
