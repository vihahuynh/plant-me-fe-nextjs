import Link from "next/link";

import styles from "./categoriesBannerItem.module.scss";
import { BsArrowRight } from "react-icons/bs/index";

export const CategoriesBannerItem = ({ category }) => {
  return (
    <div className={styles.container}>
      <Link href={`/${category.url}`}>
        <img
          className={styles.image}
          src={category.imageUrl}
          alt={category.text}
        />
      </Link>
      <div className={styles.titleContainer}>
        <h3 className={styles.title}>{category.text}</h3>
        <BsArrowRight className={styles.icon} />
      </div>
    </div>
  );
};
