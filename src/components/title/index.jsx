import styles from "./title.module.css";

export const Title = ({ titleText }) => {
  return (
    <h1 className={styles['title']}>
      { titleText }
    </h1>
  );
};