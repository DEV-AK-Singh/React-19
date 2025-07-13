import { useEffect, useState, useTransition } from "react";
import { useNavigate, useParams } from "react-router";
import { useFormStatus } from "react-dom";

const FormSubmission = ({ id }) => {
  const { pending: formPending } = useFormStatus();
  return (
    <>
      <button type="submit" disabled={formPending}>
        {id ? "Update" : "Create"}
      </button>
    </>
  );
};

export default function PostForm() {
  const { id } = useParams();
  const basename = process.env.API_URL;
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
  };

  const createPost = async () => {
    const response = await fetch(`${basename}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, views }),
    });
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate(`/posts/${data.id}`);
  };

  const updatePost = async () => { 
    const response = await fetch(`${basename}/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body, views }),
    });
    const data = await response.json();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate(`/posts/${data.id}`);
  };

  if (id) {
    useEffect(() => {
      startTransition(async () => {
        await fetchDataById(id);
      });
    }, []);
  }

  return isPending ? (
    <h1>Loading...</h1>
  ) : (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        marginBottom: "20px",
      }}
    >
      <h1>{id ? "Update" : "Create"} Post</h1>
      <form
        action={id ? updatePost : createPost}
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="body">Body</label>
        <input
          type="text"
          name="body"
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />{" "}
        <br />
        <FormSubmission id={id} />
      </form>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
