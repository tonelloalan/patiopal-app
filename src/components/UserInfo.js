import styles from "@/styles/UserInfo.module.css";

export default function UserInfo() {
  return (
    <div className={styles.userInfoContainer}>
      <div className={styles.userInfo}>
        <div>
          Name: <span>Alan Tonello</span>
        </div>
        <div>
          Email: <span>alantb2@gmail.com</span>
        </div>
        <button>Log out</button>
      </div>
    </div>
  );
}
