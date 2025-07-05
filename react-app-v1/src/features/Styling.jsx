import React from "react";
import "../assets/style.css";
import style from "../assets/styling.module.css";
import styled from "styled-components";

export default function Styling() { 
  const Button = styled.button(({variant}) => ({
    backgroundColor: variant === "primary" ? "blue" : variant === "secondary" ? "red" : "green",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  }));
  return (
    <>
      <div className={style.card}>
        <h1 style={{ color: "green" }}>Styling</h1>
        <h2>Styling</h2>
        <h3>Styling</h3>
        <Button variant="primary">Styling</Button>
        <Button variant="secondary">Styling</Button>
        <Button>Styling</Button>
      </div>
    </>
  );
}
