import React, { useEffect, useState } from "react";

const Counter = ({ count, data }) => {

    useEffect(() => {
      console.log("Counter called");
    }, [data]);

    return (
      <div>
        <h1>Counter : {count}</h1>
        <h1>Data : {data}</h1>
      </div>
    );
};

export default function UseEffect() {
    const [count, setCount] = useState(0);
    const [data, setData] = useState(0); 

    useEffect(() => {
      console.log("useEffect called");
    }, [count]); // run useEffect only when count changes or on initial render

  return (
    <div>
      <h1>UseEffect</h1>
      <Counter count={count} data={data} />
      <button onClick={() => setCount(count + 1)}>Increase count</button>
      <button onClick={() => setData(data + 1)}>Increase data</button>
    </div>
  );
}
