import { useState } from "react";
import styles from "./selectInput.module.scss";

export const SelectInput = ({
  listData,
  currentOption,
  setCurrentOption,
  multiple = false,
  placeholder = "Please select an option",
  theme = "primary",
}) => {
  const [openDataList, setOpenDataList] = useState(false);

  const onSelectMultipleData = (value) => {
    if (currentOption.includes(value)) {
      setCurrentOption((prev) => prev.filter((op) => op !== value));
    } else {
      setCurrentOption((prev) => prev.concat(value));
    }
    toggleOpenDataList();
  };

  const onSelectData = (value) => {
    setCurrentOption(value);
    toggleOpenDataList();
  };

  const toggleOpenDataList = () => setOpenDataList((prev) => !prev);

  const optionBoxClassNames = `${styles.optionBox} ${styles[theme]}`;

  if (!multiple) {
    return (
      <div className={styles.container}>
        <div className={optionBoxClassNames} onClick={toggleOpenDataList}>
          {currentOption?.value ? (
            <p className={styles.chosenText}>{currentOption?.text}</p>
          ) : (
            <p className={styles.placeholder}>{placeholder}</p>
          )}
        </div>
        <ul
          className={`${styles.dataList} ${openDataList ? styles.active : ""}`}
        >
          {listData.map((item) => (
            <li
              className={`${styles.dataItem} ${
                currentOption === item ? styles.active : ""
              }`}
              key={item.value}
              onClick={() => onSelectData(item)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <div className={optionBoxClassNames} onClick={toggleOpenDataList}>
        {currentOption?.length ? (
          <p className={styles.chosenText}>
            {currentOption?.map((op) => op.text)?.join(", ")}
          </p>
        ) : (
          <p className={styles.placeholder}>{placeholder}</p>
        )}
      </div>
      <ul className={`${styles.dataList} ${openDataList ? styles.active : ""}`}>
        {listData.map((item) => (
          <li
            className={`${styles.dataItem} ${
              currentOption.includes(item) ? styles.active : ""
            }`}
            key={item.value}
            onClick={() => onSelectMultipleData(item)}
          >
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

