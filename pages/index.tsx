import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/pages/Home.module.scss";
import Navbar from "../components/Layout/Navbar";

const Home: NextPage = () => {
  const [email, setEmail] = React.useState<string>("");
  const handleSubmit = () => {
    console.log(email);
  };
  return (
    <div className={styles.container}>
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
      <main className={styles["landing"]}>
        <div className={styles["landing__left"]}>
          <h1 className={"header-primary"}>
            Renting Licensed Kitchen Space is about to get way easier.
          </h1>
          <h2 className={"header-secondary"}>
            Foodle is being cooked right now. Stay tuned for our launch by
            submitting your email!
          </h2>
          <div>
            <input
              className={styles["landing__left--email"] + " standard-form"}
              type="text"
              placeholder="email@beemail.com"
              onChange={(val) => setEmail(val.target.value)}
            ></input>
            <button onClick={() => console.log(email)} className="primary-btn">
              Submit
            </button>
          </div>
        </div>
        <div className={styles["landing__right"]}>
          <div className={styles["landing__right"]}>
            <Image src={"/landing-2.jpg"} width={450} height={300} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
