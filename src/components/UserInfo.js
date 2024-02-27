"use client";

import { getSession, signOut, useSession } from "next-auth/react";

export default function UserInfo() {
  const { data: session, status } = useSession(); // In the Session we will have mainly name and email

  if (status === "loading") {
    return <div>Loading...</div>; // Render a loading state
  }

  return (
    <div className="userInfoContainer">
      <h3 className="welcome-header">WELCOME</h3>
      <span className="welcome-name">
        {session?.user?.firstName[0]}. {session?.user?.lastName}
      </span>

      {/* <div>
        Username: <span>{session?.user?.username}</span>
      </div> */}
    </div>
  );
}
