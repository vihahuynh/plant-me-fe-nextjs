import styles from "./userLeftMenu.module.scss";
import Link from "next/link";
import { useSelector } from "react-redux";

import {
  FaUserAlt,
  FaHeart,
  FaStarHalfAlt,
  FaShoppingCart,
  FaAddressBook,
} from "react-icons/fa";

import { BsBellFill } from "react-icons/bs";

export const UserLeftMenu = () => {
  const authen = useSelector((state) => state.authentication);
  const path = window.location.pathname.split("/")[2];
  const imgSrc = authen?.user?.avatarUrl || "/images/default-avatar.png";

  return (
    <div className={styles.container}>
      <img className={styles.avatarImg} src={imgSrc} alt="user-avatar" />
      <h3>{authen?.user?.username}</h3>
      <ul className={styles.list}>
        <li className={`${styles.item} ${path === "me" ? styles.active : ""}`}>
          <Link href="/user/me">
            <FaUserAlt className={styles.icon} />
            Account info
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "order-history" ? styles.active : ""
          }`}>
          <Link href="/user/order-history">
            <FaShoppingCart className={styles.icon} />
            Orders
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "reviews" ? styles.active : ""
          }`}>
          <Link href="/user/reviews">
            <FaStarHalfAlt className={styles.icon} />
            Reviews
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "notification" ? styles.active : ""
          }`}>
          <Link href="/user/notification">
            <BsBellFill className={styles.icon} />
            Notification
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "address" ? styles.active : ""
          }`}>
          <Link href="/user/address">
            <FaAddressBook className={styles.icon} />
            Delivery address
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "favorite-products" ? styles.active : ""
          }`}>
          <Link href="/user/favorite-products">
            <FaHeart className={styles.icon} />
            Favorite products
          </Link>
        </li>
      </ul>
    </div>
  );
};
