import styles from "./logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <span>Plant</span>
      <img src="/favicon.ico" alt="logo-a-plant" />
      <span>me</span>
    </div>
  );
};
