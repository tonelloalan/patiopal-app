"use client";

import { getSession, signOut, useSession } from "next-auth/react";
import styles from "@/styles/UserInfo.module.css";

export default function UserInfo() {
  const { data: session, status } = useSession(); // In the Session we will have mainly name and email

  if (status === "loading") {
    return <div>Loading...</div>; // Render a loading state
  }

  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfo}>
        <div>
          Name:{" "}
          <span>
            {session?.user?.firstName} {session?.user?.lastName}
          </span>
        </div>
        <div>
          Username: <span>{session?.user?.username}</span>
        </div>
        <div>
          Email: <span>{session?.user?.email}</span>
        </div>
        <button onClick={() => signOut()}>Log out</button>
      </div>
    </div>
  );
}
