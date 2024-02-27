import UserInfo from "@/components/UserInfo";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="home-container">
      <UserInfo />
      <div className="userInfoContainer">
        <Link href={"/registerBuild"}>
          {/* <strong>Register a new Building</strong> */}
          <Image
            src={"/newBuilding.png"}
            alt="new building button"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <div className="userInfoContainer">
        <Link href={"/buildings"}>
          {/* <strong>Register a new Building</strong> */}
          <Image
            src={"/myBuildings.png"}
            alt="my buildings button"
            width={200}
            height={200}
          />
        </Link>
      </div>
      <button className="home-logout-button" onClick={() => signOut()}>
        Log out
      </button>
    </div>
  );
}
