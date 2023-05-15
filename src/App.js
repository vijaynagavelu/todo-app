import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import { db } from "./App-config";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  addDoc,
  doc
} from "firebase/firestore";

const collectionRef = collection(db, "todos");

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [remaining, setRemaining] = useState(0);

  const clickHandler = async () => {
    await addDoc(collectionRef, { textField: text, tickField: false });
    gettodos();
    setText("");
  };

  const gettodos = useCallback(async () => {
    const data = await getDocs(collectionRef);
    setTodos(
      data.docs.map((doc) => {
        //console.log(doc, doc.data());
        return { ...doc.data(), id: doc.id };
      })
    );
  }, []);

  useEffect(() => {
    gettodos();
  }, [gettodos]);

  function completed(checkBox) {
    return checkBox.tickField === true;
  }

  const result = todos.filter(completed);

  useEffect(() => {
    setRemaining(result.length);
  }, [result.length]);

  const changeHandler = async (currentField, id) => {
    const Doc = doc(db, "todos", id);
    const newField = { textField: currentField };
    await updateDoc(Doc, newField);
    gettodos();
  };

  const checkBox = async (currentField, id) => {
    const Doc = doc(db, "todos", id);
    const newField = { tickField: currentField };
    await updateDoc(Doc, newField);
    gettodos();
  };

  const deleteItem = async (id) => {
    const Doc = doc(db, "todos", id);
    await deleteDoc(Doc);
    gettodos();
  };

  todos.sort(function (a, b) {
    return a.tickField - b.tickField;
  });

  return (
    <div class="App">
      <div class="header">
        Todos <span class="remaining">{todos.length - remaining}</span>
      </div>
      <input
        class="input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(event) => {
          if (text !== "" && event.key === "Enter") {
            clickHandler();
          }
        }}
      />
      <button onClick={() => clickHandler()}> </button>
      {todos.map(function (todoItem, index) {
        if (!todoItem.tickField) {
          return <div></div>;
        }

        return (
          <ul
            key={index}
            class="ul"
            style={{
              display: todoItem.tickField ? "flex" : "none"
            }}
          >
            <input
              type="checkbox"
              class="checkbox"
              checked={todoItem.tickField}
              onChange={(e) => {
                checkBox(e.target.checked, todoItem.id);
              }}
            />

            <input
              class="lists"
              type="text"
              value={todoItem.textField}
              onChange={(event) => {
                changeHandler(event.target.value, todoItem.id);
              }}
            />
            <button onClick={() => deleteItem(todoItem.id)}>
              <span aria-label="delete-icon" role="img">
                🗑️
              </span>
            </button>
          </ul>
        );
      })}
      ----todo----
      {todos.map(function (todoItem, index) {
        return (
          <ul
            class="ul"
            key={index}
            style={{
              display: todoItem.tickField ? "none" : "flex"
            }}
          >
            <input
              type="checkbox"
              class="checkbox"
              checked={todoItem.tickField}
              onChange={(e) => {
                checkBox(e.target.checked, todoItem.id);
              }}
            />

            <input
              class="lists"
              type="text"
              value={todoItem.textField}
              onChange={(event) => {
                changeHandler(event.target.value, todoItem.id);
              }}
            />
            <button class onClick={() => deleteItem(todoItem.id)}>
              <span aria-label="delete-icon" role="img">
                🗑️
              </span>
            </button>
          </ul>
        );
      })}
    </div>
  );
}
