import Link from "next/link";
import styles from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.navItem}>
            <Link href="/report">Report Environmental Issues</Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;