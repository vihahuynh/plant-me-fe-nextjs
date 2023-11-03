import Moment from "react-moment";
import styles from "./orderProgressBar.module.scss";

export const OrderProgressBar = ({ steps }) => {
  if (!steps?.length) return null;
  return (
    <ul className={styles.stepList}>
      {steps.map((step) => (
        <li key={step.id} className={styles.stepItem}>
          <p className={styles.stepTitle}>{step.title}</p>
          <p>{step.description}</p>
          <Moment format="YYYY-MM-DD hh:mm:ss">{step.createdAt}</Moment>
        </li>
      ))}
    </ul>
  );
};
