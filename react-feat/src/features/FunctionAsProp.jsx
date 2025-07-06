import React from "react";

const Child = ({ func, name }) => {
    return <div>Child: {name} <button onClick={() => func(name)}>Alert</button></div>;
};

export default function FunctionAsProp() {
  const handleNameAlert = (name) => {
    alert(name);
  };
  return (
    <div>
      <h1>FunctionAsProp</h1>
      <Child func={handleNameAlert} name="John"/>
      <Child func={handleNameAlert} name="Raj"/>
      <Child func={handleNameAlert} name="Abhi"/>
    </div>
  );
}
