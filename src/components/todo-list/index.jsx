import { Checkbox } from "../checkbox";
import styles from "./todo-list.module.css";

export const TodoList = () => {
  return (
    <section className={styles['todo-list']}>
      <div className={styles['todo-list__container']}>
        <Checkbox label={'Milk'} checked={false} />
        <Checkbox label={'Bread'} checked={false} />
        <Checkbox label={'Beer'} checked={false} />
      </div>

      <div className={styles['todo-list__footer']}>
        <span>3 item selected</span>
        <span className={styles['todo-list__button']}>
          Clear All
        </span>
      </div>
    </section>
  );
};