import { invoke } from "@tauri-apps/api";
import { Checkbox } from "../checkbox";
import styles from "./todo-list.module.css";

export const TodoList = ({ todos, handleTodos }) => {
  const handleCheck = (ID) => {
    const todoIDString = String(ID);

    invoke('set_check', { todoId: todoIDString })
      .then(response => handleTodos(JSON.parse(response)))
      .catch(error => console.error('ERROR: ', error));
  };

  const handleClear = () => {
    invoke('clear_all')
      .then(response => handleTodos(JSON.parse(response)))
      .catch(error => console.error('ERROR: ', error));
  };

  return (
    <section className={styles['todo-list']}>
      <div className={styles['todo-list__container']}>
        {todos?.length > 0 && todos.map(todo => (
          <Checkbox
            onChange={handleCheck}
            key={todo.id}
            todo={todo}
          />
        ))}
      </div>

      <div className={styles['todo-list__footer']}>
        <span>{todos && todos.length > 0
          ? `${todos.length} created items`
          : 'No items'
        }</span>
        <span onClick={handleClear} className={styles['todo-list__button']}>
          Clear All
        </span>
      </div>
    </section>
  );
};