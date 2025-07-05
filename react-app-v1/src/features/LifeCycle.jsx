import React, { useEffect, useState } from "react";

const Cycle = () => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log("mounting");
    }, []);
    useEffect(() => {
        console.log("updating");
    }, [count]);
    useEffect(() => {
        return () => {
            console.log("unmounting");
        };
    }, []);
    return <div>
        <h1>Counter : {count}</h1>
        <button onClick={() => setCount(count + 1)}>Increase count</button>
    </div>;
};

const Time = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);
        console.log("mounting time");
        return () => {
            console.log("unmounting time");
            clearInterval(interval);
        };
    }, []);
    return <h1>Time : {time}</h1>;
};

export default function LifeCycle() {
    const [visible, setVisible] = useState(true);
    const [show, setShow] = useState(false);
    return(
        <>
            {/* <button onClick={() => setVisible(!visible)}>Toggle</button>
            {visible && <Cycle />} */}
            <button onClick={() => setShow(!show)}>Toggle</button>
            {show && <Time />}
        </>
  );
}
