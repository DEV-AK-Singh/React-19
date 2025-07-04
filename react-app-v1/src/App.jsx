import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const User = ({name, age, gender, color}) => {
  return (
    <div style={{border: `1px solid ${color}`, margin: '10px', padding: '20px'}}>
      <h1>User card</h1>
      <p>Name : {name}</p>
      <p>Age : {age}</p>
      <p>Gender : {gender}</p>
    </div>
  );
};

const ChildProps = ({children, color}) => {
  return (
    <div style={{border: `1px solid ${color}`, margin: '10px', padding: '20px'}}>
      {children} 
    </div>
  );
};

function App() {
  // let count = 0
  // function increase() {
  //   count = count + 1
  //   console.log(count)
  // }

  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* Component Implementation */}
        {/* <Header/> */}
        {/* <Footer/> */}

        {/* Variable */}
        {/* <h1>Counter : {count}</h1> */}
        {/* <button onClick={increase}>Increase using variable</button> */}

        {/* useState Implementation */}
        {/* <h1>Counter : {count}</h1>
        <button onClick={() => setCount(count + 1)}>
          Increase using useState
        </button> */}

        {/* Ternary Implementation */}
        {/* <h1>
          Counter : {count === 0 ? "Zero" : count % 5 === 0 ? "BINGO" : count}
        </h1>
        <button onClick={() => setCount(count + 1)}>
          Increase
        </button> */}

        {/* Props Implementation    */}
        {/* <User name="John Doe" age="20" gender="Male" color={"white"}/>
        <User name="Jane Doe" age="22" gender="Female" color={"red"}/> */}

        Children Implementation
        <ChildProps color="red">
          <User name="John Doe" age="20" gender="Male" color={"white"}/>
          <User name="Jane Doe" age="22" gender="Female" color={"red"}/>
        </ChildProps>
      </div>
    </>
  );
}

export default App;
