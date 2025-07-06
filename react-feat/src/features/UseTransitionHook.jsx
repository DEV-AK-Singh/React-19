import React, { useTransition } from "react";

export default function UseTransitionHook() {
  const [pending, startTransition] = useTransition();
  const handleFetch = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    });
  };
  return (
    <div>
      <button onClick={handleFetch} disabled={pending}>
        Fetch Data
      </button>
      {pending && <h1>Loading...</h1>}
    </div>
  );
}
