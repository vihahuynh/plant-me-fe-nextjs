import styles from "./copyright.module.scss";

export const Copyright = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <p>&copy; plantme.com - All rights reserved.</p>
        <p>Design by Ananthu Dileep and Huynh Vi Ha</p>
        <ul className={styles.list}>
          <li>Privacy</li>
          <li>Security</li>
          <li>Terms</li>
        </ul>
      </div>
      <p>
        Image and product information taken from website{" "}
        <a href="https://www.ugaoo.com">https://www.ugaoo.com</a> (for learning
        purposes only)
      </p>
    </div>
  );
};
