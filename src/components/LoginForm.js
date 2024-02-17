import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router"; // For redirection
import styles from "@/styles/LoginForm.module.css";
import Link from "next/link";

export default function LoginForm() {
  // const { mutate } = useSWR("/api/users");
  const router = useRouter(); // Router for redirecting after sign-up.

  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const toggleSignUp = () => {
    setShowForm(!showForm); // Toggle the showForm state
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData);

    console.log("USER DATA: ", userData);

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      // User created successfully - display success message and redirect to main page
      alert("Account created! You will be redirected."); // Change later for a nicer UX.
      event.target.reset(); // Reset the form using the event target
      router.push("/");

      console.log("RESPONSE: ", response);
    } else {
      // Handle error - display form errors
      const errorData = await response.json(); // API should send back error data for this to work - check api/users.js
      alert(`Signup failed: ${errorData.message}`); // Display the error message, customize error details later if needed.
    }
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

{
  /* <h3 onClick={toggleSignUp}>CREATE AN ACCOUNT</h3>
      {showForm && (
        <form className={styles.signupForm} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name:</label>
            <br />
            <input type="text" name="firstName" id="firstName" required />
          </div>
          <div>
            <label htmlFor="lastName">Last Name:</label>
            <br />
            <input type="text" name="lastName" id="lastName" required />
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <br />
            <input type="text" name="username" id="username" required />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <br />
            <input type="text" name="email" id="email" required />
          </div>
          <div>
            <label htmlFor="passwordHash">Password:</label>
            <br />
            <input
              type="password"
              name="passwordHash"
              id="passwordHash"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPasswordHash">Confirm Password:</label>
            <br />
            <input
              type="password"
              name="confirmPasswordHash"
              id="confirmPasswordHash"
              required
            />
          </div>
          <button>Sign Up</button>
        </form>
      )} */
}
