import styles from "./products.module.scss";

import { ProductItem } from "./../../components";

export const Products = ({ products }) => {
  return (
    <div className={styles.productsContainer}>
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  );
};
