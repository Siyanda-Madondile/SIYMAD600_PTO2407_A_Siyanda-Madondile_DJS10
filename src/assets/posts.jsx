import { useState, useEffect } from "react";

export default function Posts() {
  // state for posts data
  const [posts, setPosts] = useState([]);
  // state for errrs
  const [error, setError] = useState(null);

  // fetching data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error("Data fetching failed");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Data fetching failed", error);
        setError("Data fetching failed");
      }
    };
    fetchData();
  }, []);

  // creating post elements
  const renderPosts = () => {
    return posts.map((post) => (
      <div key={post.id}>
        <h2>
          {post.id}. {post.title}
        </h2>
        <p>{post.body}</p>
      </div>
    ));
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {renderPosts()}
    </div>
  );
}