import React from "react";
import './Board.css'

class Board extends React.Component {
    render() {
        return (
        <div className="game-board">
            {this.props.squares.map((square, index) => {
                return <button className="square"
                key={index}
                style={{backgroundColor: this.props.squares[index]}}
                onClick={() => this.props.onClick(index)} />
            })}
        </div>
        );
    }
}
export default Board;