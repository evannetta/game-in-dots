import React from 'react';
import './Game.css';
import Board from '../Board/Board'

class Game extends React.Component {
  constructor(props) {
    super(props);
    
    this.fields = 25;
    this.delay = 1000;
    this.previous = 0;
    this.free = [...Array(25).keys()];
    this.intervalId = null;
    this.points = { player: 0, computer: 0};
    this.state = {
      squares: Array(25).fill('white'),
      winner: {name: '', date: ''},
     };
  }
  
  onSquareClick(index) {
    const squares = [...this.state.squares];
    if(squares[index] === 'lightblue'){
      squares[index] = 'lightgreen';
      this.points.player += 1;
      this.setState({squares});
      this.checkWinner();
    }
  }

  nextMove(){
    const squares = [...this.state.squares];
    if(squares[this.previous] === 'lightblue'){
        squares[this.previous] = 'lightcoral';
        this.points.computer += 1;
        this.setState({squares});
        if(this.checkWinner()) return;
    }
    const rand = Math.floor(Math.random() * Math.floor(this.free.length));
    this.previous = this.free[rand];
    squares[this.previous] = 'lightblue';
    this.free.splice(rand,1);
    this.setState({squares});
  }

  checkWinner(){
    const {player, computer} = this.points;
    let winner;
    if(player > this.fields*50/100 ){
      winner = {name: 'vasia', date: new Date().toUTCString()};
    } else if(computer > this.fields*50/100 ){
      winner = {name: 'computer', date: new Date().toUTCString()};
    } else return false;
    this.setState({winner});
    clearInterval(this.intervalId);
    return true;
  }

  onPlayClick(){
    this.nextMove();
    this.intervalId = setInterval(() => {
       this.nextMove();
    }, this.delay);
  }
  message(){
    const winner = this.state.winner;
    if(winner.name === 'computer'){
        return <p className = 'message'>Computer won</p>;
      } else if(winner.name === ''){
        return <p className = 'message'></p>;
      } else {
        return <p className = 'message'>{`Player ${winner.name} won`}</p>;
      }
  }
  render () {
    return (
    <div className="Game">
      <header className="Game-header">
        <h1>Game In Dots</h1>
      </header>
      <button onClick = {() => this.onPlayClick()}>Play</button>
      {this.message()}
      <Board
            squares={this.state.squares}
            onClick={(i) => this.onSquareClick(i)}
      />
    </div>
    );
  }
}

export default Game;
