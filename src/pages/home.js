import UserInfo from "@/components/UserInfo";
import styles from "@/styles/UserInfo.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          <div>
            Click here to{" "}
            <Link href={"/registerBuild"}>
              <span>Register a new Building</span>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.userInfoContainer}>
        <div className={styles.userInfo}>
          <div>
            See my{" "}
            <Link href={"/buildings"}>
              <span>Buildings List</span>
            </Link>
          </div>
        </div>
      </div>
      <UserInfo />
    </>
  );
}
