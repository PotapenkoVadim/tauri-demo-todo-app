import { Button } from "../button";
import styles from "./input-field.module.css";

export const InputField = ({ onClick, ...otherProps }) => {
  return (
    <div className={styles['field']}>
      <input
        className={styles['field__input']}
        placeholder="Add new list item"
        type="text"
        {...otherProps}
      />
      
      <Button onClick={onClick}>
        Add
      </Button>
    </div>
  );
};