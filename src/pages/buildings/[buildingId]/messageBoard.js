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

  const { data: session } = useSession();

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/buildings/${buildingId}/posts`);

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

  useEffect(() => {
    if (buildingId) {
      fetchPosts();
    }
  }, [buildingId]); // Run the effect when the buildingId changes

  async function refreshPosts() {
    setIsLoading(true);
    setError(null); // Reset error state on refresh
    try {
      console.log("Refresh initiated..."); // Check if the function is called
      const response = await fetch(`/api/buildings/${buildingId}/posts`);
      console.log("API Response:", response); // Inspect the response

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      console.log("Fetched Data:", data); // Verify the received data

      setPosts(data);
      // Scroll to the bottom after updating posts:
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="messageBoard-navBar">
        <BackButton />{" "}
        <p
          style={{ fontSize: "xx-large", marginTop: "0px", cursor: "pointer" }}
          onClick={refreshPosts}
        >
          🔄
        </p>
      </div>
      {isLoading && <p>Loading posts...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && posts.length > 0 && (
        <ul className="posts-ul">
          {posts.map((post) => (
            <li
              key={post._id}
              className={
                post.author._id === session.user._id
                  ? "post-li post-li-self"
                  : "post-li"
              }
            >
              <p
                className={
                  post.author._id === session.user._id
                    ? "post-li-author-currentUser"
                    : "post-li-author-anotherUser"
                }
              >
                <span className="post-li-author-name">
                  {post.author.firstName
                    ? `${post.author.firstName[0].toUpperCase()}.`
                    : "-"}{" "}
                  {post.author.lastName}
                </span>{" "}
                on {new Date(post.timestamp).toLocaleString()}
              </p>
              <p
                className={
                  post.author._id === session.user._id
                    ? "post-li-content-currentUser"
                    : "post-li-content-anotherUser"
                }
              >
                {post.content}
              </p>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !error && posts.length === 0 && (
        <p>
          No posts found for this building. Be the first to start a
          conversation!
        </p>
      )}
      <MessageForm buildingId={buildingId} />
    </>
  );
}
