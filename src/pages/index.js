import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/index.module.css";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className={styles.indexBody}>
        <Head>
          <title>PatioPal</title>
        </Head>
        <main className={`${styles.main} ${inter.className}`}>
          {/* <h1>PatioPal</h1> */}

          <Image
            alt="patiopal logo"
            src={"/pp-logo02.png"}
            height={150}
            width={280}
          />

          <p>
            Your friendly hub for community news, events, and connecting with
            neighbors right in your building.
          </p>

          <LoginForm />
        </main>
      </div>
    </>
  );
}
