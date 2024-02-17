import { useState } from "react";
import { useRouter } from "next/router"; // For redirection
import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";

export default function LoginForm() {
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const toggleSignUp = () => {
    setShowForm(!showForm); // Toggle the showForm state
  };

  return (
    <>
      <h3 className={styles.createAccountHeader} onClick={toggleSignUp}>
        LOGIN
      </h3>
      {showForm && (
        <div className={styles.formContainer}>
          <div className={styles.loginForm}>
            <h2>Enter your details</h2>
            <form className={styles.formDetails}>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              ></input>
              <input
                type="password"
                name="passwordHash"
                id="passwordHash"
                placeholder="Password"
              ></input>

              <button>Login</button>
              <div className={styles.errorMessage}>Error message</div>
              <Link className={styles.registerLinkPhrase} href={"/register"}>
                Don&apos;t have an account?{" "}
                <span className={styles.registerLink}>Register</span>
              </Link>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
