import React, { Fragment } from "react";
import './Board.css'

class Board extends React.Component {
  render() {
    return (
    <Fragment>
        {this.props.squares.map((_, index) => {
            return <button className="square"
            key={index}
            style={{backgroundColor: this.props.squares[index]}}
            onClick={() => this.props.onClick(index)} />
        })}
    </Fragment>
    );
    }
}
export default Board;