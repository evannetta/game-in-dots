import React, {Fragment} from "react";
import './LeaderBoard.css'

class LeaderBoard extends React.Component {
  render() {
      const topWinners = this.props.winners;
      const numWinners = 6;
      topWinners.splice(numWinners,this.props.winners.length - numWinners);
    return (
        <Fragment>
            {topWinners.map((winner) => {
                return (
                    <div className = 'winner' key = {winner.id}>
                        <p>{winner.winner}</p>
                        <p>{winner.date}</p>
                    </div>
                );
            })}
        </Fragment>
    );
    }
}
export default LeaderBoard;