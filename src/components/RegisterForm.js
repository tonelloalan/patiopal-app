"use client";
import styles from "@/styles/RegisterForm.module.css";
import Link from "next/link";
import { useState } from "react";

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [confirmPasswordHash, setConfirmPasswordHash] = useState("");
  const [error, setError] = useState("");

  // const handleSubmit = async (event) => {
  //   event.preventDefault(); // Prevent default form submission
  //   const formData = new FormData(event.target);
  //   const userData = Object.fromEntries(formData);

  //   console.log("USER DATA: ", userData);

  //   const response = await fetch("/api/users", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(userData),
  //   });
  //   if (response.ok) {
  //     // User created successfully - display success message and redirect to main page
  //     alert("Account created! You will be redirected."); // Change later for a nicer UX.
  //     event.target.reset(); // Reset the form using the event target
  //     router.push("/");

  //     console.log("RESPONSE: ", response);
  //   } else {
  //     // Handle error - display form errors
  //     const errorData = await response.json(); // API should send back error data for this to work - check api/users.js
  //     alert(`Signup failed: ${errorData.message}`); // Display the error message, customize error details later if needed.
  //   }
  // };

  // console.log("FIRST NAME: ", firstName);
  // console.log("LAST NAME: ", lastName);
  // console.log("USERNAME: ", username);
  // console.log("EMAIL: ", email);
  // console.log("PASSWORD: ", passwordHash);
  // console.log("CONFIRM PASSWORD: ", confirmPasswordHash);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from reloading

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !passwordHash ||
      !confirmPasswordHash
    ) {
      setError("All fields are mandatory.");
      return;
    }

    try {
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
          passwordHash,
          confirmPasswordHash,
        }),
      });

      if (res.ok) {
        console.log("User registration successful.");
        const form = e.target;
        form.reset();
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
            onChange={(e) => setPasswordHash(e.target.value)}
            type="password"
            name="passwordHash"
            id="passwordHash"
            placeholder="Password"
          ></input>
          <input
            onChange={(e) => setConfirmPasswordHash(e.target.value)}
            type="password"
            name="confirmPasswordHash"
            id="confirmPasswordHash"
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
