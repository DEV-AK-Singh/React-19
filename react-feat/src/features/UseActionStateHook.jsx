import React, { useActionState } from "react";

export default function UseActionStateHook() {
  const handleSubmit = async (_, data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (data.get("name")) {
      return {
        message: "Form submitted",
        status: "success",
      };
    } else {
      return {
        message: "Please enter a name",
        status: "error",
      };
    }
  };
  const [data, action, pending] = useActionState(handleSubmit);
  return (
    <div>
      <form action={action}>
        <input type="text" placeholder="Enter your name" name="name" />
        {
          data?.status === "success" && <p style={{ color: "green" }}>{data.message}</p>
        }
        {
          data?.status === "error" && <p style={{ color: "red" }}>{data.message}</p>
        }
        <button type="submit" disabled={pending}>
          Submit
        </button>
      </form>
    </div>
  );
}
