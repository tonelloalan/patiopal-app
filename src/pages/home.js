import UserInfo from "@/components/UserInfo";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="userInfoContainer">
        <div className="userInfo">
          <div>
            Click here to{" "}
            <Link href={"/registerBuild"}>
              <strong>Register a new Building</strong>
            </Link>
          </div>
        </div>
      </div>
      <div className="userInfoContainer">
        <div className="userInfo">
          <div>
            See my{" "}
            <Link href={"/buildings"}>
              <strong>Buildings List</strong>
            </Link>
          </div>
        </div>
      </div>
      <UserInfo />
    </>
  );
}
