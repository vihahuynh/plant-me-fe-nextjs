import { Rating } from "@mui/material";
import Link from "next/link";

import { AiOutlineLike } from "react-icons/ai";

import styles from "./userReviewItem.module.scss";

export const UserReviewItem = ({ item }) => {
  if (!item) return null;
  return (
    <div className={styles.userReviewItem}>
      <img
        src={
          item?.product?.images?.find((img) => img.includes("eye")) ||
          item?.product?.images?.[0] ||
          item?.product?.image
        }
        alt=""
      />

      <div className={styles.reviewContent}>
        <Link href={`/products/${item.product.id}`}>
          <h5 className={styles.productTitle}>{item?.product?.title}</h5>
        </Link>
        <Rating
          className={styles.rating}
          name="read-only"
          value={item.rating}
          readOnly
        />
        <h5>{item.title}</h5>
        <p>{item.content}</p>
        <div className={styles.iconBox}>
          <AiOutlineLike className={styles.icon} />
          <span>{item.like}</span>
        </div>
        <div>
          {!!item.images.length &&
            item.images.map((img) => <img key={img} src={img} alt="" />)}
        </div>
      </div>
    </div>
  );
};
