import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { InputField, Title, TodoList } from "./components";
import styles from "./styles/application.module.css";

export const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    invoke('get_todos')
      .then(response => setTodos(JSON.parse(response)))
      .catch(error => console.error('ERROR: ', error));
  }, []);

  const handleClick = (label) => {
    const newTodo = {
      id: Date.now(),
      label,
      checked: false
    };

    invoke('add_todo', {todo: newTodo})
      .then(response => setTodos(JSON.parse(response)))
      .catch(error => console.error('ERROR: ', error));
  };

  return (
    <main className={styles['app']}>
      <section>
        <Title titleText="Daily To Do List" />

        <InputField onClick={handleClick} />

        <TodoList todos={todos} handleTodos={setTodos} />
      </section>
    </main>
  );
};