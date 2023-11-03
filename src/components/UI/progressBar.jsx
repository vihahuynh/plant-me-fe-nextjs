import styles from "./progressBar.module.scss";

export const ProgressBar = ({ percent }) => {
  return (
    <span className={styles.container}>
      <span className={styles.percent} style={{ width: `${percent}%` }}></span>
    </span>
  );
};
