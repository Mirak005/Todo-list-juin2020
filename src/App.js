import React, { useState } from "react";


function App() {
  const [text, setText] = useState("");
  const [editText, setEditText] = useState("");
  const [todos, setTodos] = useState([
    { text: "My First task", id: 0, readOnly: true },
    { text: "second task", id: 1, readOnly: true },
  ]);

  // add todo
  const addTodo = (event) => {
    event.preventDefault();
    if (text.trim() === "") {
      alert("Enter A valid todo");
      return;
    }
    const newTodo = {
      text: text,
      id: todos.length,
      readOnly: true,
    };
    setTodos([...todos, newTodo]);
    setText("");
  };

  //remove todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEdit = (id, oldValue) => {
    setTodos(
      todos.map((todo) =>
        id === todo.id
          ? { ...todo, readOnly: false }
          : { ...todo, readOnly: true }
      )
    );
    setEditText(oldValue);
  };

  //confirm edit
  const confirmEdit = (id, newText) => {
    if (newText.trim() === "") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, readOnly: true } : todo
        )
      );
      return alert("Enter a valid modification");
    }

    setTodos(
      todos.map((todo) =>
        id === todo.id ? { ...todo, text: newText, readOnly: true } : todo
      )
    );
  };

  return (
    <div>
      <form>
        <input
          value={text}
          type="text"
          onChange={(e) => setText(e.target.value)}
        />
        {/*  onClick={(event)=> addTodo(event)}    */}
        <button onClick={addTodo}>Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              onChange={(e) => setEditText(e.target.value)}
              type="text"
              value={todo.readOnly ? todo.text : editText}
              readOnly={todo.readOnly}
            />
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
            <button
              onClick={() =>
                todo.readOnly
                  ? startEdit(todo.id, todo.text)
                  : confirmEdit(todo.id, editText)
              }
            >
              {" "}
              {todo.readOnly ? "Edit" : "Confirm"}{" "}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

/// App js
/// AddTodo    //// todoList
///// todoCard
