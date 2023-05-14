import styles from "./checkbox.module.css";

export const Checkbox = ({label, checked, onChage, ...otherProps}) => {
  return (
    <label className={styles['checkbox']}>
      <input
        checked={checked}
        onChage={onChage}
        className={styles['checkbox__input']}
        type="checkbox"
        {...otherProps}
      />

      <span className={styles['checkbox__container']} />
      <span className={styles['checkbox__label']}>
        {label}
      </span>
    </label>
  );
};