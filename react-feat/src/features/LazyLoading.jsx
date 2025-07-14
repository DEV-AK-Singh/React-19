import React, { lazy, Suspense, useState } from "react";
// import LazyComponent from "./LazyComponent";
const LazyComponent = lazy(() => import("./LazyComponent"));

export default function LazyLoading() {
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <h1>Lazy Loading</h1><br />
      <button onClick={() => setLoaded(!loaded)}>Load Lazy Component</button><br /><br />
      {loaded && <Suspense fallback={<h1>Loading...</h1>}><LazyComponent /></Suspense>}
    </>
  );
}
