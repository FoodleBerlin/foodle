import { NextComponentType, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import styles from "../../styles/pages/Home.module.scss";
import Tab from "./Tab";

interface LandingInfoProps {
  leftText: string;
  rightText: string;
  containerStyle: string;
}

const LandingInfo = (props: LandingInfoProps) => {
  return (
    <div className={props.containerStyle}>
      <div>{props.leftText}</div>
      <div>{props.rightText}</div>
    </div>
  );
};
export default LandingInfo;
