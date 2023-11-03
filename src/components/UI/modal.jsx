import { Button } from "./../../components";

import styles from "./modal.module.scss";

export const Modal = ({
  isOpen = false,
  title,
  message,
  onConfirm,
  actionText,
  onCancel,
  children,
  size = "small",
  showButtonGroup = true,
}) => {
  const modalClassNames = `${styles.modal} ${styles[size]}`;
  return (
    <div className={isOpen ? styles.container : styles.hidden}>
      <div className={styles.layout} onClick={onCancel} />
      <div className={modalClassNames}>
        {children ? (
          <>{children}</>
        ) : (
          <div>
            <h5>{title}</h5>
            <p>{message}</p>
          </div>
        )}
        {showButtonGroup && (
          <div className={styles.buttonGroup}>
            <Button
              text={actionText}
              size="small"
              borderRadius="square"
              onClick={onConfirm}
            />
            <Button
              theme="light"
              text="Cancel"
              size="small"
              borderRadius="square"
              onClick={onCancel}
            />
          </div>
        )}
      </div>
    </div>
  );
};
