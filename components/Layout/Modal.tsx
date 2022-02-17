import React from "react";
import styles from "./Modal.module.scss";

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
          <h4 className={styles["modal__title"]}>Modal title</h4>
        </div>
        <div className={styles["modal__body"]}>This is modal content</div>
        <div className={styles["modal__footer"]}>
          <button onClick={props.onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
