import { InputField } from "./components/input-field";
import { Title } from "./components/title";
import { TodoList } from "./components/todo-list";
import styles from "./styles/application.module.css";

export const App = () => {
  const handleClick = () => console.log('Click!!!');

  return (
    <main className={styles['app']}>
      <section>
        <Title titleText="Daily To Do List" />

        <InputField onClick={handleClick} />

        <TodoList />
      </section>
    </main>
  );
};