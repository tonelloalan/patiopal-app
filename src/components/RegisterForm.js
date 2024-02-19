"use client";
import styles from "@/styles/RegisterForm.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const session = useSession();

  // The below will prevent user from manually attempting to visit the login or register pages if already in session (logged in).
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/home");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from reloading

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("All fields are mandatory.");
      return;
    } // This checks if any of the fields were left blank and informs user with error message in such case.

    if (password !== confirmPassword) {
      setError("Passwords must match!");
      return;
    } // This checks is both entered passwords are not matching and informs user with error message in such case.

    try {
      // CHECK IF USER ALREADY EXISTS...
      const resUserExists = await fetch("/api/userExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });

      const { userId } = await resUserExists.json(); // Get the userId received from the userExists endpoint, which is checking if there is already an ID assigned to it or if it is still "null"...

      // ... and then checks if it was written on the form when submitted. If this is the case, it will return an error message to the user informing so.
      if (userId) {
        console.log("THIS USER ALREADY EXISTS: ", userId);
        setError("User already exists!");
        return;
      }
      // ...CHECK IF USER ALREADY EXISTS.

      // CHECK IF EMAIL ALREADY EXISTS...
      const resEmailExists = await fetch("/api/emailExists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { emailId } = await resEmailExists.json(); // Get the emailId received from the emailExists endpoint, which is checking if there is already an ID assigned to it or if it is still "null"...

      // ... and then checks if it was written on the form when submitted. If this is the case, it will return an error message to the user informing so.
      if (emailId) {
        console.log("THIS EMAIL IS ALREADY IN USE: ", emailId);
        setError("Email is already in use!");
        return;
      }

      // ...CHECK IF EMAIL ALREADY EXISTS.

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
          confirmPassword,
        }),
      });

      if (res.ok) {
        console.log("User registration successful.");
        setError("");
        const form = e.target;
        form.reset();
        router.push("/"); // After successfull user registration, user will be pushed to the login page.
      } else {
        console.log("User registration failed.");
      }
    } catch (e) {
      console.log("Error during registration: ", e);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.loginForm}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className={styles.formDetails}>
          <input
            onChange={(e) => setFirstName(e.target.value)} // this stores the value inside this input field into the state
            type="text"
            name="firstName"
            id="firstName"
            placeholder="First name"
          ></input>
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="lastName"
            id="lastName"
            placeholder="Last name"
          ></input>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          ></input>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          ></input>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          ></input>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Repeat Password"
          ></input>
          <button>Register</button>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <Link className={styles.registerLinkPhrase} href={"/"}>
            Already have an account?{" "}
            <span className={styles.registerLink}>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
