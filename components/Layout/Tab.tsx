import Link from "next/link";
import React from "react";
import styles from "./Navbar.module.scss";

interface TabProps {
  href: string;
  title: string;
  icon?: string;
}
const Tab = (props: TabProps) => (
  <div className={styles["navbar__menu--item"]}>
    <Link href={props.href || "/"}>
      <a className={styles["navbar__menu--link"]}>
        <span className={styles["navbar__menu--underline"]}>{props.title}</span>
      </a>
    </Link>
  </div>
);
export default Tab;
