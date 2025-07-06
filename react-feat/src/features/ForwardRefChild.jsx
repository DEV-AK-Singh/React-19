import React, { forwardRef } from "react";

export const ModernForwardRef = (props) => {
    const handleClick = () => {
        console.log(props.ref.current.value, props.name);
    };
    return <div onClick={handleClick}>Child Modern Ref</div>;
};

const ForwardRefChild = (props, ref) => {
    const handleClick = () => {
        console.log(ref.current.value, props.name);
    };
    return <div onClick={handleClick}>Child Ref Old</div>;
}

export default forwardRef(ForwardRefChild);