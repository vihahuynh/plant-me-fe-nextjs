import Link from "next/link";
import { helpLinks, categoryLinks, supportLinks } from "./../../../data";

import { ImInstagram, ImFacebook2 } from "react-icons/im";

import { Copyright, UsefulLinks, Logo } from "./../../../components";

import styles from "./footer.module.scss";

export const Footer = () => {
  return (
    <footer>
      <div className={styles.container}>
        <div className={styles.footerLeft}>
          <div>
            <Logo />
            <p>plantme.com is Link popular e-commerce</p>
            <p>site exclusively for plant and plant care.</p>
            <p>We provide the best for plants</p>
            <p>and also provide best services.</p>
          </div>
          <div className={styles.iconContainer}>
            <Link href="/">
              <ImFacebook2 className={styles.icon} />
            </Link>
            <Link href="/">
              <ImInstagram className={styles.icon} />
            </Link>
          </div>
        </div>
        <div className={styles.usefulLinksContainer}>
          <UsefulLinks title="Help" links={helpLinks} />
          <UsefulLinks title="Store" links={categoryLinks} />
          <UsefulLinks title="Support" links={supportLinks} />
        </div>
      </div>
      <Copyright />
    </footer>
  );
};
