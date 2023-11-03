import { ImSpinner } from "react-icons/im";

import styles from "./loading.module.scss";

export const Loading = () => {
  return (
    <div className={styles.container}>
      <ImSpinner className={styles.icon} />
    </div>
  );
};
