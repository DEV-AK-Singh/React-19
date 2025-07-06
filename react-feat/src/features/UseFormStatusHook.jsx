import React from "react";
import { useFormStatus } from "react-dom";

const FormContent = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <input type="text" placeholder="Enter your name" />
      <button type="submit" disabled={pending}>
        Submit {pending}
      </button>
    </>
  );
};

export default function UseFormStatusHook() {
  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log("Form submitted");
  };
  return (
    <div>
      <form action={handleSubmit}>
        <FormContent />
      </form>
    </div>
  );
}
