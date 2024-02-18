"use client";

import { signOut, useSession } from "next-auth/react";
import styles from "@/styles/UserInfo.module.css";

export default function UserInfo() {
  const { data: session } = useSession(); // In the Session we will have mainly name and email

  console.log("SESSION USER: ", session); // Ensure firstName is present

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfo}>
        <div>
          Name: <span>{session?.user?.name}</span>
        </div>
        <div>
          Email: <span>{session?.user?.email}</span>
        </div>
        <button onClick={() => signOut()}>Log out</button>
      </div>
    </div>
  );
}
