import Image from "next/image";
import Link from "next/link";
import logo from "../../../../public/ocean-watch-1.jpg";

import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={logo} width={130} height={130} alt="Ocean Watch Logo" />
        <span>OceanWatch</span>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li className={styles.navItem}>
            <Link href="/">Home</Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/report">Report Environmental Issues</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;