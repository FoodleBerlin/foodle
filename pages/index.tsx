import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/pages/Home.module.scss";
import Navbar from "../components/Layout/Navbar";
import LandingInfo from "../components/Layout/LandingInfo";

const Home: NextPage = () => {
  const [email, setEmail] = React.useState<string>("");
  return (
    <div>
      <Head>
        <title>Foodle</title>
        <meta
          name="description"
          content="The landing page of the up and coming
        kitchen rental portal, Foodle."
        />
        <link rel="icon" href="/foodle_logo.svg" />
        <style type="text/css">
          <link
            href="https://dafonttop.com/wp-data/a/21/8021/file/archia-regular-webfont.ttf"
            rel="stylesheet"
          />
        </style>
      </Head>
      <Navbar />
      <div className={styles["hero"]}>
        <div className={styles["hero__left"]}>
          <h1 className={"header-primary"}>
            Renting Licensed Kitchen Space is about to get way easier.
          </h1>
          <h2 className={"body-text"}>
            Foodle is being cooked right now. Stay tuned for our launch by
            submitting your email!
          </h2>
          <div>
            <input
              className={styles["hero__left--email"] + " standard-form"}
              type="text"
              placeholder="Notify me for early access"
              onChange={(val) => setEmail(val.target.value)}
            ></input>
            <button onClick={() => console.log(email)} className="primary-btn">
              Submit Email
            </button>
          </div>
        </div>
        <div className={styles["hero__right"]}>
          <div className={styles["hero__right"]}>
            <Image src={"/programming.png"} width={450} height={350} />
          </div>
        </div>
      </div>
      <h2 className={styles["random-text"] + " header-secondary"}>
        Make your entrepreneurial food dreams come true.
      </h2>
      <div className={styles["carousel"]}>
        <h2 className={"header-secondary"}>Licensed Kitchens For Rent</h2>
        <div className={styles["carousel__wrapper"]}>
          <Image
            alt="carousel-image"
            src={"/carousel-image-1.png"}
            width={461}
            height={515}
          />
          <Image
            alt="carousel-image"
            src={"/carousel-image-2.png"}
            width={461}
            height={515}
          />
          <Image
            alt="carousel-image"
            src={"/carousel-image-3.png"}
            width={461}
            height={515}
          />
        </div>
      </div>
      <LandingInfo />
    </div>
  );
};

export default Home;
