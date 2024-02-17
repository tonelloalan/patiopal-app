import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/index.module.css";
import LoginForm from "@/components/LoginForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>PatioPal</title>
      </Head>
      <body>
        <main className={`${styles.main} ${inter.className}`}>
          <h1>PatioPal App</h1>
          <p>
            Your friendly hub for community news, events, and connecting with
            neighbors right in your building.
          </p>
          <LoginForm />
        </main>
      </body>
    </>
  );
}
