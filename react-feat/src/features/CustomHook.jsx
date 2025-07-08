import React, { useState } from "react";

const useToggle = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const toggle = (val) => (typeof val === "boolean" ? setValue(val) : setValue(!value));
  return [value, toggle];
};

export default function CustomHook() {
  const [value, toggle] = useToggle();
  return (
    <div>
      <h1>CustomHook: {value ? <h1>Element</h1> : null}</h1>
      <button onClick={toggle}>Toggle</button>
      <button
        onClick={() => {
          toggle(true);
        }}
      >
        Show
      </button>
      <button
        onClick={() => {
          toggle(false);
        }}
      >
        Hide
      </button>
    </div>
  );
}
