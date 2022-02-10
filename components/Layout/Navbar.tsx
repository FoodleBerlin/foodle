import { NextComponentType, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Navbar.module.scss";
import Tab from "./Tab";
import Search from "./Search";
import { BurgerMenu } from "./BurgerMenu";

const Navbar: NextComponentType = () => {
  return (
    <nav className={styles["navbar"]}>
      <div className={styles["navbar__logo"]}>
        <Link href="/">
          <a>
            <Image
              src="/foodle_logo.svg"
              width={70}
              height={45}
              alt="Foodle Logo"
            />
          </a>
        </Link>
      </div>
      <div className={styles["navbar__menu"]}>
        <Tab href="/" title="EN/DE" />
        <Tab href="/" title="How It Works" />
        <Tab href="/" title="List Your Kitchen" />
        <Tab href="/" title="Contact" />
      </div>
    </nav>
  );
};
export default Navbar;
