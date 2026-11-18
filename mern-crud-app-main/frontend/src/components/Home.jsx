import { useEffect, useState } from "react";
import Header from "./Header";
import Post from "./Post";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(
          "https://fsd-backend-qjoc.onrender.com/api/v1/posts"
        );

        if (!response.ok) {
          throw new Error("Unable to load posts. Please try again.");
        }

        const data = await response.json();

        if (!Array.isArray(data.data)) {
          throw new Error("The server returned an unexpected response.");
        }

        setPosts(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div>
      <Header />

      <div className="posts-container">
        {loading && <p>Loading posts...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <p>No posts yet. Create your first post!</p>
        )}

        {!loading &&
          !error &&
          posts.map((post) => <Post key={post._id} post={post} />)}
      </div>
    </div>
  );
}

export default Home;