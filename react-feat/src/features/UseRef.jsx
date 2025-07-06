import React, { useRef, useState } from "react";

export default function UseRef() {
  const [name, setName] = useState('');
  const nameRef = useRef(null);

  return(
    <>
      <div>
        <h1>Controlled Components</h1>
        <h1>Name: {name}</h1>
        <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
      </div>
      <div>
        <h1>Uncontrolled Components</h1> 
        <input type="text" name="nameRef" ref={nameRef}/>
        <button onClick={() => alert(nameRef?.current.value || 'No value found')}>Update Name</button>
      </div>
    </>
  );
}
