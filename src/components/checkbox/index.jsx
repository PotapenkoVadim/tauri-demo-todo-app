import styles from "./checkbox.module.css";

export const Checkbox = ({todo, onChange, ...otherProps}) => {
  const handleChange = () => onChange(todo.id);
  
  return (
    <label className={styles['checkbox']}>
      <input
        checked={todo.checked}
        onChange={handleChange}
        className={styles['checkbox__input']}
        type="checkbox"
        {...otherProps}
      />

      <span className={styles['checkbox__container']} />
      <span className={styles['checkbox__label']}>
        {todo.label}
      </span>
    </label>
  );
};