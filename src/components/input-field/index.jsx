import { useState } from "react";
import { Button } from "../button";
import styles from "./input-field.module.css";

export const InputField = ({ onClick, ...otherProps }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = event => setInputValue(event.target.value);
  const handleButtonClick = () => {
    onClick(inputValue);
    setInputValue("");
  };

  return (
    <div className={styles['field']}>
      <input
        className={styles['field__input']}
        placeholder="Add new list item"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        {...otherProps}
      />
      
      <Button onClick={handleButtonClick}>
        Add
      </Button>
    </div>
  );
};