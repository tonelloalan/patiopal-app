"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

export default function LoginForm() {
  const [showForm, setShowForm] = useState(true); // State to control form visibility
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const session = useSession();
  const router = useRouter();

  // The below will prevent user from manually attempting to visit the login or register pages if already in session (logged in).
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/home");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials!");
        return;
      }

      router.replace("home");
    } catch (error) {
      console.log("ERROR: ", error);
    }
  };

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
            <form onSubmit={handleSubmit} className={styles.formDetails}>
              <input
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                id="username"
                placeholder="Username"
              ></input>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              ></input>

              <button>Login</button>

              {error && <div className={styles.errorMessage}>{error}</div>}
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
