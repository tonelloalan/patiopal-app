// MessageForm.js (or your relevant file)

import React, { useState } from "react";

export default function MessageForm({ buildingId }) {
  // Pass buildingId to the component
  const [content, setContent] = useState("");

  // ... form state management for 'content' ...

  const handleChange = async (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // ... form validation ...

    try {
      const response = await fetch(`/api/buildings/${buildingId}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, buildingId }),
        credentials: "include", // Include user credentials
      });

      if (response.ok) {
        // ... success, clear the form ...
        console.log("New post submitted successfully!");
        const form = event.target; // Access the form element
      } else {
        // ... handle error, display message to user ...
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
    form.reset(); // Reset the form
  };

  return (
    <form className="posts-form" onSubmit={handleSubmit}>
      <textarea
        name="content"
        placeholder="What's on your mind?"
        rows={"1"}
        autoFocus={true}
        required
        value={content}
        onChange={handleChange}
      />
      <input type="hidden" name="buildingId" value={buildingId} />{" "}
      {/* Hidden field */}
      <button className="post-submit-button" type="submit">
        Post
      </button>
    </form>
  );
}
