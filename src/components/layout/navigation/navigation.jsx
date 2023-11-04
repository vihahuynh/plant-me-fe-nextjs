import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";

import { BiUserCircle } from "react-icons/bi/index";
import { BiCartAlt } from "react-icons/bi/index";

import { authenticationActions, cartActions } from "@/store";
import { NavigationItem, Logo, LinkButton } from "@/components";

import styles from "./navigation.module.scss";

export const Navigation = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("loggedUser");
    dispatch(authenticationActions.logout());
    dispatch(cartActions.clear());
    router``.push("/");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.mobileNav}>
        <span></span>
        <ul className={styles.mobileMenu}>
          <NavigationItem url="/" title="Home" type="mobile" />
          <NavigationItem url="/shop" title="Shop" type="mobile" />
          <NavigationItem url="/cart" title="Cart" type="mobile" />
          <NavigationItem url="/about" title="About Us" type="mobile" />
          <NavigationItem url="/contact" title="Contact" type="mobile" />
          {authen?.user?.token ? (
            <>
              <NavigationItem
                url="/user/me"
                title="Account info"
                type="mobile"
              />
              <NavigationItem
                url="/user/order-history"
                title="My orders"
                type="mobile"
              />
              <NavigationItem
                url="/user/review"
                title="My reviews"
                type="mobile"
              />
              <NavigationItem
                url="/user/notification"
                title="My notification"
                type="mobile"
              />
              <NavigationItem
                url="/user/favorite-products"
                title="Favorite products"
                type="mobile"
              />
              <NavigationItem
                url="/user/address"
                title="Delivery addresses"
                type="mobile"
              />
              <li onClick={logout}>Log out</li>
            </>
          ) : (
            <>
              <NavigationItem url="/signin" title="Sign In" type="mobile" />
              <NavigationItem url="/signup" title="Sign Up" type="mobile" />
            </>
          )}
        </ul>
      </div>
      <div className={styles.mainNav}>
        <Logo />
        <ul className={styles.navList}>
          <NavigationItem url="/" title="Home" />
          <NavigationItem url="/shop" title="Shop" />
          {/* <NavigationItem url="blogs" title="Blog" /> */}
          <NavigationItem url="/about" title="About Us" />
          <NavigationItem url="/contact" title="Contact" />
        </ul>
      </div>
      <div className={styles.subNav}>
        <Link href="/cart" className={styles.cart}>
          <BiCartAlt className={styles.icon} />
          <span className={styles.quantity}>{cartQuantity}</span>
        </Link>
        {authen.isLoggedIn ? (
          <>
            <div className={styles.userMenuBox}>
              <BiUserCircle className={styles.icon} />
              <ul className={styles.userMenu}>
                <NavigationItem
                  url="/user/me"
                  title="Account info"
                  type="user"
                />
                <NavigationItem
                  url="/user/order-history"
                  title="Orders"
                  type="user"
                />
                <NavigationItem
                  url="/user/reviews"
                  title="Reviews"
                  type="user"
                />
                <NavigationItem
                  url="/user/notification"
                  title="Notification"
                  type="user"
                />
                <NavigationItem
                  url="/user/favorite-products"
                  title="Favorite products"
                  type="user"
                />
                <NavigationItem
                  url="/user/address"
                  title="Delivery addresses"
                  type="user"
                />
                <li onClick={logout}>Log out</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <LinkButton
              url="/signin"
              text="Sign in"
              size="small"
              borderRadius="square"
            />
            <LinkButton
              url="/signup"
              text="Sign up"
              size="small"
              theme="light"
              borderRadius="square"
            />
          </>
        )}
      </div>
    </nav>
  );
};
