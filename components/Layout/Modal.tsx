import React from "react";
import styles from "./Modal.module.scss";
import Link from "next/link";
import Image from "next/image";

interface IModalProps {
  show: boolean;
  onClose: Function;
}

const Modal = (props: IModalProps) => {
  if (!props.show) {
    return null;
  }
  return (
    <div className={styles["modal"]} onClick={props.onClose}>
      <div
        className={styles["modal__content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles["modal__header"]}>
          <div className={styles["modal__title"] + " body-text"}>
            Log in or sign up
          </div>
          <Link href="/">
            <a className={styles["modal__close"]} onClick={props.onClose}>
              <Image
                src="/close-x.svg"
                width={21}
                height={21}
                alt="Close Login"
              />
            </a>
          </Link>
        </div>
        <div className={styles["modal__body"]}>
          <h2 className="header-secondary">Welcome to Foodle!</h2>
          <div className={styles["modal__form"]}>
            <input
              className={styles["modal__body--zip"] + " standard-form"}
            ></input>
            <button className={"primary-btn"}>Continue with google</button>
            <button className={"primary-btn"}>Continue with facebook</button>
          </div>
        </div>
        <div className={styles["modal__footer"]}></div>
      </div>
    </div>
  );
};

export default Modal;
