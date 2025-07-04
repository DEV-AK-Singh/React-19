import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

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
      </div>
    </>
  );
}

export default App;
