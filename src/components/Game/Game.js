import React from 'react';
import './Game.css';
import Board from '../Board/Board'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.previous = 0;
    this.free = [];
    this.gameStarted = null;
    this.points = { player: 0, computer: 0};
    this.captionPlay = 'Play';
    this.presets = {};
    this.settings= {};
    this.state = {
      isPlayDisabled : true,
      squares: Array(25).fill('white'),
      winner: {name: '', date: ''},
    };
    this.onPlayClick = this.onPlayClick.bind(this);
    this.onInputSettings = this.onInputSettings.bind(this);
  }

  componentDidMount(){
    fetch("https://starnavi-frontend-test-task.herokuapp.com/game-settings")
    .then(res => res.json())
    .then(
      (result) => {
        this.presets = result;
      },
      (error) => {
        this.presets = {easyMode: {field: 5*5, delay: 2000}};
      }
    )
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
        this.checkWinner();
        if(!this.gameStarted) {
          return;
        }
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
    if(player > this.settings.field*50/100 ){
      winner = {name: this.settings.playerName, date: new Date().toUTCString()};
    } else if(computer > this.settings.field*50/100 ){
        winner = {name: 'computer', date: new Date().toUTCString()};
      } else {
        return;
    }
    this.setState({winner});
    this.stopGame();
  }

  stopGame(){
    clearInterval(this.gameStarted);
    this.gameStarted = null;
  }

  startGame(){
    this.nextMove();
    this.gameStarted = setInterval(() => {
       this.nextMove();
    }, this.settings.delay);
  }

  initNewGame(){
    this.previous = 0;
    this.points = { player: 0, computer: 0};
    const mode = this.settings.mode;
    this.settings.field = this.presets[mode].field**2;
    this.free = [...Array(this.settings.field).keys()];
    this.settings.delay = this.presets[mode].delay;
    this.setState({squares: Array(this.settings.field).fill('white'), winner: {name: '', date: ''}},
     () => this.startGame());
  }

  onPlayClick(event){
    event.preventDefault();
    if(this.gameStarted){
      this.stopGame();
    }
    if(this.captionPlay === 'Play'){
      this.captionPlay = 'Play again';
    }
    this.initNewGame();
  }

  message(){
    if(this.state.winner.name === 'computer'){
      return 'Computer won';
    } else {
      return `Player ${this.state.winner.name || 'anonymous'} won`;
    }
  }
 
  onInputSettings (event) {
    if(event.target.name === 'name'){
      this.settings.playerName = event.target.value;
    }
    if(event.target.name === 'mode'){
      this.settings.mode = event.target.value;
      if(this.gameStarted){
        this.stopGame();
      }
      this.setState({isPlayDisabled : false});
    }
  }

  render () {
    return (
    <div className="Game">
      <header className="Game-header">
        <h1>Game In Dots</h1>
      </header>
      <form onSubmit={this.onPlayClick}>
          <select name = 'mode' defaultValue='Pick game mode' onChange={this.onInputSettings}>
            <option hidden>Pick game mode</option>
            <option value='easyMode'>Easy</option>
            <option value='normalMode'>Normal</option>
            <option value='hardMode'>Hard</option>
          </select>
          <input name = 'name' type="text" placeholder='Enter your name' onChange = {this.onInputSettings}/>
          <input id = 'play-button' type="submit" disabled={this.state.isPlayDisabled}  value={this.captionPlay}/>
      </form>
      <p className = 'message'>
      {this.state.winner.name!=='' ? this.message(): ''}
      </p>
      <div className="game-board">
        <Board 
              squares={this.state.squares}
              onClick={(i) => this.onSquareClick(i)}
        />
      </div>
    </div>
    );
  }
}
 
export default Game;
