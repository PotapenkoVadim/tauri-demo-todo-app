import styles from "./button.module.css";

export const Button = ({className, ...otherProps}) => {
  const buttonClasses = `${styles['button']} ${className ?? ''}`;

  return (
    <button
      className={buttonClasses}
      {...otherProps}
    />
  );
};