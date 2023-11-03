import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai/index";

import styles from "./quantityInput.module.scss";

export const QuantityInput = ({
  quantity,
  onChange,
  size = "medium",
  disabled = false,
}) => {
  let containerClassName;
  if (size === "medium") containerClassName = styles.quantityContainer;
  else containerClassName = styles.quantitySmallContainer;
  return (
    <div className={`${containerClassName} ${disabled ? styles.disabled : ""}`}>
      <span onClick={() => onChange(+quantity - 1)}>
        <AiOutlineMinusCircle className={styles.icon} />
      </span>
      <input
        className={styles.quantityInput}
        type="text"
        value={quantity}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <span onClick={() => onChange(+quantity + 1)}>
        <AiOutlinePlusCircle className={styles.icon} />
      </span>
    </div>
  );
};
