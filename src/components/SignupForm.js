import { useState } from "react";
import { useRouter } from "next/router"; // For redirection

export default function SignupForm() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [buildingAddress, setBuildingAddress] = useState("");

  const router = useRouter(); // Router for redirecting after sign-up.

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission

    if (password !== confirmPassword) {
      alert("Passwords must match!"); // Very basic, improve this later
      return;
    }

    const response = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
        confirmPassword,
        buildingAddress,
      }),
    });
    if (response.ok) {
      // User created successfully - display success message and redirect to main page
      alert("Account created! You will be redirected."); // Change later for a nicer UX.
      router.push("/");
    } else {
      // Handle error - display form errors
      const errorData = await response.json(); // API should send back error data for this to work - check api/users.js
      alert(`Signup failed: ${errorData.message}`); // Display the error message, customize error details later if needed.
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button>Sign Up</button>
      </form>
    </>
  );
}
