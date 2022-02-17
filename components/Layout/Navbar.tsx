import { NextComponentType, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "./Navbar.module.scss";
import Tab from "./Tab";

const Navbar: NextComponentType = () => {
  return (
    <nav className={styles["navbar"] + " flex-center"}>
      <div className={styles["navbar__logo"] + " flex-center"}>
        <Link href="/">
          <a>
            <Image
              src="/foodle_logo.svg"
              width={50}
              height={35}
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
      <div className={styles["navbar__auth-btns"]}>
        <button className="secondary-btn">Login</button>
        <button className=" secondary-btn">Signup</button>
      </div>
    </nav>
  );
};
export default Navbar;
