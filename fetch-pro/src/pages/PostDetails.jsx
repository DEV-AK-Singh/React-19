import { useEffect, useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";

export default function PostDetails() {
  const basename = process.env.API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [views, setViews] = useState(0);

  const fetchDataById = async (id) => {
    const response = await fetch(`${basename}/posts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setTitle(data.title);
    setBody(data.body);
    setViews(data.views);
    return data;
  };

  const updatePost = async (currentData) => {
    const response = await fetch(`${basename}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...currentData, views: currentData.views + 1 }),
    });
    const data = await response.json(); 
    setViews(data.views);
    return data;
  };

  useEffect(() => {
    startTransition(async () => {
      const fetchedData = await fetchDataById(id);
      const updatedData = await updatePost(fetchedData);
      console.log(updatedData);
    });
  }, []);

  return isPending ? (
    <h1>Loading...</h1>
  ) : (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Post Details : {id}</h1>
      <div
        style={{ border: "2px solid white", margin: "20px", padding: "10px" }}
      >
        <h3 style={{ color: "orange" }}>{title.toUpperCase()}</h3> <hr />{" "}
        <p>{body}</p> <hr />{" "}
        <h3 style={{ color: "lightblue" }}>Views: {views}</h3>
      </div>
      <button onClick={() => navigate(-1)} style={{ margin: "20px" }}>
        Go Back
      </button>
    </div>
  );
}
