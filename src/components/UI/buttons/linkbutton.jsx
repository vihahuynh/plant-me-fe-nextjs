import styles from "./linkButton.module.scss";
import Link from "next/link";

export const LinkButton = ({
  text,
  size = "medium",
  url,
  borderRadius = "circle",
  className,
  theme = "primary",
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${
    styles[borderRadius]
  } ${className || ""} ${styles[theme]}`;
  return (
    <Link className={buttonClassName} href={url}>
      {text}
    </Link>
  );
};
