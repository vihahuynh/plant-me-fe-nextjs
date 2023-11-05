import { LinkButton } from "@/components";
import styles from "./infoBox.module.scss";

export const InfoBox = ({ text, btnText, url, theme = "primary" }) => {
  const classNames = theme
    ? `${styles.infoBox} ${styles[theme]}`
    : `${styles.infoBox} ${styles[theme]}`;
  return (
    <div className={styles.container}>
      <div className={classNames}>
        <img src="./images/logo.png" alt="logo" />
        <p>{text}</p>
        {btnText && url ? (
          <LinkButton
            text={btnText}
            size="medium"
            url={url}
            className={styles.btn}
          />
        ) : null}
      </div>
    </div>
  );
};
