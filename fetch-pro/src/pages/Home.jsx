import React, { useEffect, useState, useTransition } from "react";
import { Link, useNavigate } from "react-router";

export default function Home() {
  const basename = process.env.API_URL;
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [pending, startTransition] = useTransition();

  const fetchData = async () => {
    const response = await fetch(`${basename}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    startTransition(async () => {
      await fetchData();
    });
  }, []);

  if (pending) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <button onClick={() => navigate("/post/create")}>Create Post</button>
      <h1>Home: Posts | {posts.length}</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th style={{ textAlign: "left" }}>Title</th>
            <th>Views</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td style={{ textAlign: "left" }}>{post.title}</td>
              <td>{post.views}</td>
              <td>
                <Link to={`/posts/${post.id}`}>Details</Link> |{" "}
                <Link to={`/post/update/${post.id}`}>Update</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
