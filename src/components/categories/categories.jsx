import Link from "next/link";
import styles from "./categories.module.scss";

export const Categories = () => {
  return (
    <div className={styles.grid}>
      <Link
        href="/shop?skip=0&limit=12&typeOfPlants=Cacti%20and%20Succulents"
        className={styles.firstGrid}>
        <div>
          <h5>All</h5>
          <h5>About Castus</h5>
        </div>
        <img src="/images/castus.png" alt="castus" />
      </Link>
      <Link
        href="/shop?skip=0&limit=12&whereToGrow=Outdoor%20Shade&whereToGrow=Outdoor%20Sunny"
        className={styles.secondGrid}>
        <h5>Outdoor Plants</h5>
        <img
          src="/images/philodendronb-birkin-plant.png"
          alt="philodendronb-birkin-plant"
        />
      </Link>
      <Link
        href="/shop?skip=0&limit=12&whereToGrow=Indoor"
        className={styles.thridGrid}>
        <h5>Indoor Plants</h5>
        <img
          src="/images/fittonia-green-plant.png"
          alt="fittonia green plant"
        />
      </Link>
    </div>
  );
};
