"use client";

import styles from "@/styles/RegisterForm.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function RegisterBuildForm() {
  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session, status } = useSession(); // In the Session we will have mainly name and email

  // Redirect to index.js if not authenticated
  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/index");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page from reloading

    // Make all fields mandatory and display error message if submitted empty.
    if (!streetName || !streetNumber || !zipcode || !city || !country) {
      setError("All fields are mandatory!");
      return;
    }

    // Simple zipcode format check (adapt this for your location)
    const zipcodeRegex = /^[0-9]{5}$/;
    if (!zipcodeRegex.test(zipcode)) {
      setError("Please enter a valid zip code.");
      return;
    }

    try {
      const res = await fetch("/api/registerBuild", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          streetName,
          streetNumber,
          zipcode,
          city,
          country,
        }),
      });

      if (res.ok) {
        console.log("Building registration successful.");
        setError("");

        const form = e.target; // Access the form element
        form.reset(); // Reset the form

        router.push("/home");
        // TO DO: redirect to "Buildings List" page: router.push("/pageName");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Something went wrong");
      }

      // ... Handle response (success redirect, error display)
    } catch (e) {
      if (e.response) {
        // Error from the backend API
        const errorMessage = await e.response.json();
      } else {
        // Network error or other client-side issue
        setError("Failed to register building, please try again.");
      }
    }
  };

  return (
    <>
      <Link href="/home" style={{ fontSize: "xx-large" }}>
        🔙
      </Link>
      <div className={styles.formContainer}>
        <div className={styles.loginForm}>
          <h2>Register new Building</h2>
          <form onSubmit={handleSubmit} className={styles.formDetails}>
            <input
              onChange={(e) => setStreetName(e.target.value)}
              type="text"
              placeholder="Street Name"
            ></input>
            <input
              onChange={(e) => setStreetNumber(e.target.value)}
              type="text"
              placeholder="Street Number"
            ></input>
            <input
              onChange={(e) => setZipcode(e.target.value)}
              type="text"
              placeholder="Zipcode"
            ></input>
            <input
              onChange={(e) => setCity(e.target.value)}
              type="text"
              placeholder="City"
            ></input>

            <select
              id="country"
              name="country"
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="" disabled selected>
                Select your country
              </option>
              <option value={"DE"}>Germany</option>
            </select>
            <button>Register Building</button>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </form>
        </div>
      </div>
    </>
  );
}