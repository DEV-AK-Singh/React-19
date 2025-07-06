import React, { useState } from "react";

export default function DerivedState() {
  const [name, setName] = useState("");
  const [names, setNames] = useState([]);
  const totalNames = names.length;
  const uniqueNamesCount = names.filter(
    (name, index) => names.indexOf(name) === index
  ).length;
  const lastName = names[names.length - 1];
  return (
    <>
      <h1>DerivedState</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => setNames([...names, name])}>Add Name</button>
      <br />
      <br />
      <h2>Unique Names: {totalNames}</h2>
      <h2>Unique Names: {uniqueNamesCount}</h2>
      <h2>Latest Name: {lastName}</h2>
    </>
  );
}
