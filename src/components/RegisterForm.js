import styles from "@/styles/RegisterForm.module.css";
import Link from "next/link";

export default function RegisterForm() {
  return (
    <div className={styles.formContainer}>
      <div className={styles.loginForm}>
        <h2>Register</h2>
        <form className={styles.formDetails}>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
          ></input>
          <input
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last name"
          ></input>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          ></input>
          <input
            type="password"
            name="email"
            id="email"
            placeholder="Email"
          ></input>
          <input
            type="password"
            name="passwordHash"
            id="passwordHash"
            placeholder="Password"
          ></input>
          <input
            type="password"
            name="confirmPasswordHash"
            id="confirmPasswordHash"
            placeholder="Repeat Password"
          ></input>
          <button>Register</button>
          <div className={styles.errorMessage}>Error message</div>
          <Link className={styles.registerLinkPhrase} href={"/"}>
            Already have an account?{" "}
            <span className={styles.registerLink}>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
