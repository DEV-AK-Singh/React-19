import React from "react";
import "../assets/style.css";
import style from "../assets/styling.module.css";
import styled from "styled-components";

const StyledButton = styled.button((props) => ({
  backgroundColor: props.$primary ? "blue" : props.$secondary ? "red" : props.$tertiary ? "green" : "gray",
  color: props.$primary ? "white" : "black",
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  cursor: "pointer",
  fontSize: "16px",
  "&:hover": {
    opacity: 0.8,
  },
}));

export default function Styling() { 
  return (
    <>
      <div className={style.card}>
        <h1 style={{ color: "green" }}>Styling</h1>
        <h2>Styling</h2>
        <h3>Styling</h3> 
        <StyledButton $primary>Styled Button</StyledButton> 
        <StyledButton $secondary>Styled Button</StyledButton> 
        <StyledButton $tertiary>Styled Button</StyledButton>  
      </div>
    </>
  );
}
