import React from "react";
import Board from "./Board";

class Game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            arr: [[0,1,2],[3,4,5],[6,7,8]],
            selectedStep: 0,
            location: new Map(),
            isAsc: true,
            victory: [],
        };
    }

    handelCheckBoxOnChange = e => {
        const checked = e.target.checked;
        if(checked){
            this.setState({
                isAsc: false,
            })
        } else {
            this.setState({
                isAsc: true,
            })
        }
    }

    jumpTo = step =>{
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            selectedStep: step,
            victory: [],
          });
      
    }

    handelClick = i =>{
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const location = this.state.location;
        const [winner, victory]= calculateWinner(squares);
        location.set(history.length,i)
        if(winner || squares[i]){
            this.setState({
                victory: victory,
            })
            return;
        }
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            selectedStep: this.state.selectedStep + 1,
            location: location,
        });
    }

    render() {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const winner= calculateWinner(current.squares)[0];
        const moves = history.map((step, move) =>{
            let tmp = ``; 
            for(let index = 0; index < this.state.arr.length; index++)
                for(let j = 0; j < this.state.arr.length; j++)
                    if(this.state.arr[index][j] === this.state.location.get(move)) tmp = `Hang ${index} Cot ${j}`;
        
        const desc = move ? `Go to move #${move} ${tmp}` : `Go to game start`;
        return(
            <li key={move}  >
                <button className={`btn ${this.state.selectedStep === move ? "highlight" : ""}`} onClick={() => this.jumpTo(move)}>
                    {desc}
                </button>
            </li>
        )
      });
      if(!this.state.isAsc){
        moves.reverse();
      }
      let status;
      if(winner){
        status = `Winner ${winner}`;
      } else {
        const endGame = current.squares.includes(null) ? false : true;
        if (endGame) {
          status = 'The game draw';
      } else {
          status = 'The next player is ' + (this.state.xIsNext ? 'X' : 'O');
      }
      }

      return (
        <div className="game">
          <div className="game-board">
          <div className="status">{status}</div>
            <Board
                victory={this.state.victory}
                squares={current.squares}
                onClick={i => this.handelClick(i)}
             />
             <label className="switch">
                <input type="checkbox" onChange={this.handelCheckBoxOnChange}/>
                <span className="slider round"></span>
             </label>
          </div>
          <div className="game-info">
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
}


function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [squares[a], lines[i]];
      }
    }
    return [null, null];
  }

export default Game;