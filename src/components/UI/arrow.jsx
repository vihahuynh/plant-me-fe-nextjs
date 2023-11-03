import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri/index";
import styles from "./arrow.module.scss";

export const Arrow = ({ onClick, className, type }) => {
  return (
    <button
      className={`${className} ${
        type === "next" ? styles.nextArrow : styles.prevArrow
      }`}
      onClick={onClick}>
      {type === "next" ? (
        <RiArrowLeftSLine className={styles.icon} />
      ) : (
        <RiArrowRightSLine className={styles.icon} />
      )}
    </button>
  );
};
