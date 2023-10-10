import React from "react";
import Square from "./Square";

class Board extends React.Component {
    renderSquare(i, isWinnerSquare) {
      return (
        <Square
            key={i}
            index={i}
            isWinnerSquare = {isWinnerSquare}
            victory={this.props.victory}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />
      );
    }
  
    render() {
        let rows = [];
        for(let i=0; i<3;i++){
            let squares = [];
            for(let j=0; j<3; j++){
                if(this.props.victory && this.props.victory.includes(i * 3 + j)){
                    squares.push(this.renderSquare(i * 3 + j, true));
                }
                else{
                    squares.push(this.renderSquare(i * 3 + j, false));
                }
            }
            rows.push(<div className="board-row" key={i}>{squares}</div>);
        }
      return (
        <div>
          {rows}
        </div>
      );
    }
  }

  
export default Board;