import { useState } from "react";
import styles from "./accordion.module.scss";

import { RiArrowLeftSLine } from "react-icons/ri/index";

export const Accordion = ({ children, title, active = false }) => {
  const [isActive, setIsActive] = useState(active);

  return (
    <div className={styles.accordion}>
      <div
        className={
          isActive ? `${styles.header} ${styles.active}` : styles.header
        }
        onClick={() => setIsActive((prev) => !prev)}>
        <p>{title}</p>
        <RiArrowLeftSLine className={styles.icon} />
      </div>
      <div
        className={
          isActive ? `${styles.content} ${styles.active}` : styles.content
        }>
        {children}
      </div>
    </div>
  );
};
