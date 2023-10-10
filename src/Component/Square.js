import React from "react";

function Square(props) {
    return(
        <button
        key={props.value} 
        className={`square ${props.isWinnerSquare ? "highlight" :""}`}
        onClick={props.onClick}>
        {props.value}
        </button>
    );
}

export default Square;