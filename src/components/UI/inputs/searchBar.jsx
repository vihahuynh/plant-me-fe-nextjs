import styles from "./searchBar.module.scss";
import { GoSearch } from "react-icons/go/index";

export const SearchBar = ({ borderRadius = "circle" }) => {
  const searchBarClassNames = `${styles.searchContainer} ${styles[borderRadius]}`;
  return (
    <div className={searchBarClassNames}>
      <input className={styles.input} type="text" placeholder="Search here" />
      <GoSearch className={styles.icon} />
    </div>
  );
};
