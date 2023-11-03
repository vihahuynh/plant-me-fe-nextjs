import styles from "./alert.module.scss";

export const Alert = ({ message, type = "info" }) => {
  const messageBoxClasses = `${styles.messageBox} ${styles[type]}`;

  if (!message) return null;

  return (
    <div className={messageBoxClasses}>
      <p>{message}</p>
    </div>
  );
};
