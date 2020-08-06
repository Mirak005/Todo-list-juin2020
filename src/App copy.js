import React, { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([
    { todo: "First task", isEdited: false, id: 0 },
  ]);
  const [value, setValue] = useState("");
  const [editValue, setEditValue] = useState("");

  const addTodo = (todo) => {
    if (!todo.trim()) {
      return alert("Enter a valid Task");
    }
    const newTodo = { todo, id: Date.now(), isEdited: false };
    setTodos([...todos, newTodo]);
    setValue("");
  };

  const removeTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const editTodo = (id, newText) => {
    if (!editValue.trim()) {
      return alert("Enter a valid Task");
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, todo: newText, isEdited: false } : todo
      )
    );
    setEditValue("");
  };

  const confirmEdit = (id, oldValue) => {
    if (!oldValue) {
      setTodos(todos.map((todo) => ({ ...todo, isEdited: false })));
      return;
    }

    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isEdited: true }
          : { ...todo, isEdited: false }
      )
    );
    setEditValue(oldValue);
  };

  return (
    <div>
      <form className="add-todo-form" onSubmit={(e) => e.preventDefault()}>
        <h1>Todo App </h1>
        <div className="input-container">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            className="my-btn add-btn btn-primary"
            onClick={() => addTodo(value)}
          >
            Add
          </button>
        </div>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <li key={todo.id} className="todo-card">
              <input
                className={todo.isEdited ? "todo-text edited" : "todo-text "}
                type="text"
                value={todo.isEdited ? editValue : todo.todo}
                readOnly={!todo.isEdited}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button
                className="my-btn delete-btn btn-danger"
                onClick={() => removeTodo(todo.id)}
              >
                DELETE
              </button>
              <button
                className="my-btn"
                onClick={() =>
                  todo.isEdited
                    ? editTodo(todo.id, editValue)
                    : confirmEdit(todo.id, todo.todo)
                }
              >
                {todo.isEdited ? "CONFIRM" : "EDIT"}
              </button>

              {todo.isEdited && (
                <button className="my-btn" onClick={() => confirmEdit(todo.id)}>
                  Cancel
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
