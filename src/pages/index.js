import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import SignupForm from "@/components/SignupForm";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>PatioPal App</title>
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>PatioPal App</h1>
        <SignupForm />
      </main>
    </>
  );
}
