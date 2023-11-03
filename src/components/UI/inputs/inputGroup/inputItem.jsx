import { useReducer } from "react";
import styles from "./inputItem.module.scss";
import { RiSave3Line, RiCloseLine } from "react-icons/ri/index";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        value: action.value,
        isValid: !!action.value.length,
        isTouched: true,
      };
    case "TOUCHED":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

export const InputItem = ({ item, inputTitle, onSave, onCancel }) => {
  const [titleState, dispatchTitle] = useReducer(reducer, {
    value: item.title,
    isValid: item.title ? true : false,
    isTouched: item.title ? true : false,
  });
  const [contentState, dispatchContent] = useReducer(reducer, {
    value: item.content,
    isValid: item.content ? true : false,
    isTouched: item.content ? true : false,
  });

  const handleChangeTitle = (e) =>
    dispatchTitle({ type: "CHANGE", value: e.target.value });

  const handleChangeContent = (e) =>
    dispatchContent({ type: "CHANGE", value: e.target.value });

  const onCancelEdit = () => {
    onCancel();
    dispatchTitle({ type: "CHANGE", value: item.title });
    dispatchContent({ type: "CHANGE", value: item.content });
  };

  const onSaveItem = () => {
    if (titleState.isValid && contentState.isValid) {
      onSave(titleState.value, contentState.value);
    } else {
      dispatchContent({ type: "TOUCHED" });
      dispatchTitle({ type: "TOUCHED" });
    }
  };

  return (
    <div className={styles.formItem}>
      <h5>
        {inputTitle}
        <div>
          <RiSave3Line
            className={`${styles.icon} ${styles.iconBlue}`}
            onClick={onSaveItem}
          />
          <RiCloseLine
            className={`${styles.icon} ${styles.iconRed}`}
            onClick={onCancelEdit}
          />
        </div>
      </h5>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Title"
          value={titleState.value}
          onChange={handleChangeTitle}
        />
        {!!titleState.isTouched && !titleState.isValid && (
          <p className={styles.errors}>Title is required</p>
        )}
      </div>
      <div className={styles.inputContainer}>
        <textarea
          rows={3}
          name="Content"
          placeholder="Content"
          value={contentState.value}
          onChange={handleChangeContent}
        />
        {!!contentState.isTouched && !contentState.isValid && (
          <p className={styles.errors}>Content is required</p>
        )}
      </div>
    </div>
  );
};
