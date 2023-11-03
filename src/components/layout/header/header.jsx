import { LinkButton } from "../..";
import styles from "./header.module.scss";

export const Header = () => {
  return (
    <section className={styles.container}>
      <div className={styles.descriptionContainer}>
        <h1>Why wait,</h1>
        <h1>
          <span>Plant</span> a new tree
        </h1>
        <div className={styles.description}>
          <p>The best time to plant a tree was 20 years ago</p>
          <p>The second best time is today</p>
        </div>
        <LinkButton
          className={styles.discoverBtn}
          text="Discover"
          size="large"
          url="/shop"
        />
      </div>
      <img src="/images/header-img.png" alt="large-snake-plant" />
      <ul className={styles.contact}>
        <li className={styles.contactItem}>Instagram</li>
        <li className={styles.contactItem}>Facebook</li>
        <li className={styles.contactItem}>Twitter</li>
      </ul>
    </section>
  );
};
