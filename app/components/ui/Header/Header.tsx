"use client";

import useDeviceType from "@/app/hooks/useDeviceType";
import Image from "next/image";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

import styles from "./header.module.scss";
import logo from "../../../../public/ocean-watch-1.jpg";

const Header = () => {
  const { isMobile } = useDeviceType();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image
          src={logo}
          width={isMobile ? 60 : 130}
          height={isMobile ? 60 : 130}
          alt="Coast Keeper Logo"
        />
        <span>CoastKeeper</span>
      </div>
      {isMobile ? (
        <>
          <GiHamburgerMenu
            className={styles.hamburgerIcon}
            onClick={() => setIsOpen(!isOpen)}
          />
          {isOpen && (
            <nav className={styles.mobileNav}>
              <ul>
                <li className={styles.navItem}>
                  <Link href="/">Home</Link>
                </li>
                <li className={styles.navItem}>
                  <Link href="/report">Report Environmental Issues</Link>
                </li>
              </ul>
            </nav>
          )}
        </>
      ) : (
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
      )}
    </header>
  );
};

export default Header;
