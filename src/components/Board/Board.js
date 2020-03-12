import React from "react";
import './Board.css'

class Board extends React.Component {
    render() {
        const width = 300;
        const field = Math.sqrt(this.props.field);
        const squareSize = Math.floor(width/field);
        const boardStyle = {
            gridTemplateColumns: `repeat(${field}, ${squareSize}px`,
            gridTemplateRows: `repeat(${field}, ${squareSize}px`,
        }
        return (
            <div className = 'board' style = {boardStyle}>
                {this.props.squares.map((_, index) => {
                    return (
                    <button className = 'square'
                    key = {index}
                    style = {{backgroundColor: this.props.squares[index]}}
                    onClick = {() => this.props.onClick(index)} 
                    />);
                })}
            </div>
        );
    }
}
export default Board;