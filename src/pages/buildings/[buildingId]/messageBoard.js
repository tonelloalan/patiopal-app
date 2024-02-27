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
  useEffect(() => {
    if (buildingId) {
      fetchPosts();
    }
  }, [buildingId]); // Run the effect when the buildingId changes

  const refreshPosts = async () => {
    setIsLoading(true);
    setError(null); // Reset error state on refresh
    try {
      const fetchPosts = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/buildings/${buildingId}/posts`);

          console.log("RESPONSE FE:====== ", response);
          //   if (!response.ok) {
          //     throw new Error("Failed to fetch posts");
          //   }
          const data = await response.json();
          console.log("DATA::::::::::::::::::: ", data);
          setPosts(data);
          fetchPosts();
        } catch (error) {
          setError(error.message || "Something went wrong");
        } finally {
          setIsLoading(false);
          fetchPosts();
        }
      };
    } catch (error) {
      // ... handle error ...
    } finally {
      setIsLoading(false);
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
      {!isLoading && !error && posts.length > 0 && (
        <ul>
          {posts.map((post) => (
            <li key={post._id}>
              <p>{post.content}</p>
              <p>
                {post.author.firstName
                  ? `${post.author.firstName[0].toUpperCase()}.`
                  : "-"}{" "}
                {post.author.lastName} on{" "}
                {new Date(post.timestamp).toLocaleString()}
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
