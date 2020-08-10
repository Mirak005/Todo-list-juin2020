import React, { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [todos, setTodos] = useState([
    { text: "My First task", id: 0, isEdited: false, isComplet: true },
    { text: "second task", id: 1, isEdited: false, isComplet: false },
  ]);

  //add todo
  const addTodo = (event, newText) => {
    event.preventDefault();
    if (newText.trim() === "") {
      return alert("Enter a Valid Todo");
    }

    const newTodo = {
      text: newText,
      id: todos.length,
      isEdited: false,
      isComplet: false,
    };

    setTodos([...todos, newTodo]);
    //reset the value
    setValue("");
  };

  //remove todo
  const removeTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  //edit Todo
  const editTodo = (id, newTodo) =>
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newTodo } : todo))
    );
  // setTodos(
  //   todos.map((todo) => {
  //     if (todo.id === id) {
  //       return {
  //         text: newTodo,
  //         id: todo.id,
  //       };
  //     } else {
  //       return todo;
  //     }
  //   })
  // );

  // toggle Edited
  const onFocus = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, isEdited: true }
          : { ...todo, isEdited: false }
      )
    );
  // finish the edit mode
  const onBlur = () =>
    setTodos(todos.map((todo) => ({ ...todo, isEdited: false })));

  const handleComplete = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isComplet: !todo.isComplet } : todo
      )
    );

  return (
    <div>
      <form className="add-todo-form">
        <h1>Todo-App</h1>
        <div className="input-container">
          <input
            // save the todo in value
            onChange={(event) => setValue(event.target.value)}
            value={value}
            type="text"
          />
          <button
            onClick={(e) => addTodo(e, value)}
            className="my-btn btn-primary"
          >
            ADD
          </button>
        </div>
      </form>

      <ul>
        {todos.map((el) => (
          <li key={el.id} className="todo-card">
            <input
              style={
                el.isEdited ? { boxShadow: "5px 3px 13px 5px #00000054" } : {}
              }
              onFocus={() => onFocus(el.id)}
              onBlur={() => onBlur()}
              readOnly={!el.isEdited}
              onChange={(event) => editTodo(el.id, event.target.value)}
              className={el.isComplet ? "todo-text text-complete" : "todo-text"}
              type="text"
              value={el.text}
            />
            <button
              onClick={() => removeTodo(el.id)}
              className="my-btn btn-danger"
            >
              Delete
            </button>
            <button
              onClick={() => handleComplete(el.id)}
              className="my-btn btn-primary"
            >
              {el.isComplet ? "Undo" : "Complete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
