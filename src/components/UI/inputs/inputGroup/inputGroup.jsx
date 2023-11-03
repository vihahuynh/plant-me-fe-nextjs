import { useState } from "react";
import { GroupItem, InputItem, Button } from "./../../../../components";

import styles from "./inputGroup.module.scss";

export const InputGroup = ({ inputTitle, items, setItems }) => {
  // const [items, setItems] = useState([]);
  const [openForm, setOpenForm] = useState(true);

  const handleAddItem = (title, content) => {
    setItems((prev) =>
      prev.concat({
        id: Date.now(),
        title,
        content,
      })
    );
    onCancel();
  };

  const onCancel = () => {
    setOpenForm(false);
  };

  return (
    <div className={styles.container}>
      <h5>{inputTitle}</h5>
      <ul className={styles.itemList}>
        {items.map((i) => (
          <GroupItem key={i.id} item={i} setItems={setItems} />
        ))}
      </ul>
      {openForm ? (
        <InputItem
          inputTitle={`Item ${items.length + 1}`}
          onSave={handleAddItem}
          onCancel={onCancel}
          item={{ title: "", content: "" }}
        />
      ) : (
        <Button
          text="+ New item"
          size="small"
          borderRadius="square"
          onClick={() => setOpenForm(true)}
        />
      )}
    </div>
  );
};
