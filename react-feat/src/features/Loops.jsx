import React from "react";

const User = ({ name, age, gender, color }) => {
  return (
    <div
      style={{ border: `1px solid ${color}`, margin: "10px", padding: "20px" }}
    >
      <h1>User card</h1>
      <p>Name : {name}</p>
      <p>Age : {age}</p>
      <p>Gender : {gender}</p>
    </div>
  );
};

export default function Loops() {
  const usersData = [
    { name: "A", age: 25, gender: "male" },
    { name: "B", age: 30, gender: "male" },
    { name: "C", age: 35, gender: "female" },
    { name: "D", age: 40, gender: "female" },
  ];
  return (
    <>
      <h1>Users</h1>
      {usersData.map((user, index) => (
        <User
          key={index}
          name={user.name}
          age={user.age}
          gender={user.gender}
          color={index % 2 === 0 ? "red" : "blue"}
        />
      ))}
    </>
  );
}
