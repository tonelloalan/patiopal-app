import MessageForm from "@/components/MessageForm";
import { useState, useEffect } from "react";
import BackButton from "@/components/BackButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function MessageBoard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const buildingId = router.query.buildingId;

  const { data: session, status } = useSession();

  console.log("CLIENT-SIDE SESSION FE: ", session);
  console.log("SESSION STATUS FE: ", status);
  console.log("BUILDING ID FE: ", buildingId);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/buildings/${buildingId}/posts`);

        console.log("RESPONSE FE: ", response);
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [buildingId]); // Run the effect when the buildingId changes

  const refreshPosts = async () => {
    setIsLoading(true);
    setError(null); // Reset error state on refresh
    try {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/buildings/${buildingId}/posts`);

          console.log("RESPONSE FE: ", response);
          if (!response.ok) {
            throw new Error("Failed to fetch posts");
          }
          const data = await response.json();
          setPosts(data);
        } catch (error) {
          setError(error.message || "Something went wrong");
        } finally {
          setIsLoading(false);
        }
      };
    } catch (error) {
      // ... handle error ...
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    // ... your existing form submission logic ...

    if (response.ok) {
      // ... form reset ...

      // Refresh posts after successful submission
      fetchPosts();
    } else {
      // ... handle error ...
    }
  };

  return (
    <>
      <BackButton />{" "}
      <p
        style={{ fontSize: "xx-large", marginTop: "0px", cursor: "pointer" }}
        onClick={refreshPosts}
      >
        🔄
      </p>
      {isLoading && <p>Loading posts...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <p>{post.content}</p>
              <p>
                {post.firstName ? `${post.firstName[0].toUpperCase()}.` : "-"}{" "}
                {post.author.lastName} on{" "}
                {new Date(post.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
      <MessageForm buildingId={buildingId} />
    </>
  );
}

// export default function MessageBoard() {
//   return (
//     <>
//       <h2>Hello!</h2>
//       <h2>This is a Message Board</h2>

//       <div style={{ textAlign: "left" }}>
//         <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
//           <p>
//             <span style={{ fontWeight: "bold" }}>A. Tonello</span>, on
//             26.02.2023 15:54
//           </p>
//         </span>
//         <p
//           style={{
//             backgroundColor: "white",
//             borderRadius: "13px",
//             padding: "8px",
//             margin: "0",
//             marginBottom: "25px",
//           }}
//         >
//           This is a sample message.
//         </p>
//       </div>
//       <div style={{ textAlign: "right" }}>
//         <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
//           <p>
//             <span style={{ fontWeight: "bold" }}>C. Amend</span>, on 26.02.2023
//             15:57
//           </p>
//         </span>
//         <p
//           style={{
//             backgroundColor: "#B0B6AC",
//             borderRadius: "13px",
//             padding: "8px",
//             margin: "0",
//             marginBottom: "25px",
//           }}
//         >
//           This is another sample message. 🙋
//         </p>
//       </div>
//       <div style={{ textAlign: "left" }}>
//         <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
//           <p>
//             <span style={{ fontWeight: "bold" }}>A. Tonello</span>, on
//             26.02.2023 16:00
//           </p>
//         </span>
//         <p
//           style={{
//             backgroundColor: "white",
//             borderRadius: "13px",
//             padding: "8px",
//             margin: "0",
//             marginBottom: "25px",
//           }}
//         >
//           This is a sample message yet again. 👋
//         </p>
//       </div>
//       <div style={{ textAlign: "left" }}>
//         <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
//           <p>
//             <span style={{ fontWeight: "bold" }}>J. Schneider</span>, on
//             26.02.2023 16:04
//           </p>
//         </span>
//         <p
//           style={{
//             backgroundColor: "white",
//             borderRadius: "13px",
//             padding: "8px",
//             margin: "0",
//             marginBottom: "25px",
//           }}
//         >
//           This is a sample message, so many 😅
//         </p>
//       </div>
//       <div style={{ textAlign: "right" }}>
//         <span style={{ fontSize: "x-small", padding: "0", margin: "0" }}>
//           <p>
//             <span style={{ fontWeight: "bold" }}>C. Amend</span>, on 26.02.2023
//             16:13
//           </p>
//         </span>
//         <p
//           style={{
//             backgroundColor: "#B0B6AC",
//             borderRadius: "13px",
//             padding: "8px",
//             margin: "0",
//             marginBottom: "25px",
//           }}
//         >
//           Cool chat, guys. 👏
//         </p>
//       </div>
//       <input placeholder="Type your message here..." />
//       <button>Send</button>
//     </>
//   );
// }
