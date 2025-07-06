import React from "react"; 
import ForwardRefChild, { ModernForwardRef } from "./ForwardRefChild";

export default function ForwardRef() {
  const inputRef = React.useRef(null);
  return (
    <div>
      <input type="text" ref={inputRef}/>
      <ForwardRefChild ref={inputRef} name="John"/>
      <ModernForwardRef ref={inputRef} name="Raj"/>
    </div>
  );
}
