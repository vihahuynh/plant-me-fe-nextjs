import { categoriesBanners } from "@/data";
import { CategoriesBannerItem } from "@/components";

import styles from "./categoriesBanners.module.scss";

export const CategoriesBanners = () => {
  return (
    <div className={styles.categoriesContainer}>
      {categoriesBanners.map((category) => (
        <CategoriesBannerItem key={category.id} category={category} />
      ))}
    </div>
  );
};
