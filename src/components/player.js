import React, { Component } from 'react';
import { connect } from 'react-redux';

import { playMoveAction, changeValuesOfStatesAction } from '../redux/actions/app';

import { getStateHash } from '../redux/reducers/helpers';

import '../styles/Player.css';


class Player extends Component {

  constructor (props) {
    super(props);
    this.wins = 0;
  }

  // Function to make random move
  makeRandomBotMove = (vals) => {
    let possiblePositions = [];
    for ( let i = 0 ; i < 3 ; i++ ) {
        for ( let j = 0 ; j < 3 ; j++ ) {
            if ( vals[i][j] === 0 ) {
                possiblePositions.push([i,j]);
            }
        }
    }
    if (possiblePositions.length > 0) {
        let randPos = Math.floor(Math.random()*(possiblePositions.length-1));
        return possiblePositions[randPos];
    } else {
        return null;
    }
  };

  makeGreedyBotMove = (vals) => {
    let possiblePositions = [];
    for ( let i = 0 ; i < 3 ; i++ ) {
        for ( let j = 0 ; j < 3 ; j++ ) {
            if ( vals[i][j] === 0 ) {
                possiblePositions.push([i,j]);
            }
        }
    }
    if (possiblePositions.length > 0) {
        let bestPos, bestVal = -1, val, s;
        for(let pos of possiblePositions) {
          vals[pos[0]][pos[1]] = this.props.symbol;
          // Get State Hash
          s = getStateHash(vals);
          // Get Value of State
          val = this.getValueOfState(s);
          if(this.props.mode === 'HxB') {
            console.log(`(${pos[0]},${pos[1]}) => ${val}`);
          }
          if (val > bestVal) {
            bestPos = pos;
            bestVal = val;
          }
          vals[pos[0]][pos[1]] = 0;
        }
        return bestPos;
    } else {
        return null;
    }
  };

  getValueOfState = (s) => {
    let val = this.props.symbol === 1 ? this.props.valueOfStatesFor1.get(s) : this.props.valueOfStatesFor2.get(s);
    return val;
  }

  componentDidMount () {
    if (this.props.isBot && this.props.mode === 'BxB') {
      this.props.changeValuesOfStates(this.props.symbol, []);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isBot && this.props.currentPlayerIsBot) {
      if (this.props.symbol === this.props.currentPlayer) {
          if (!this.props.gameOver) {

            let pos;
            if (Math.random() < this.props.eps && this.props.mode === 'BxB') {
              pos = this.makeRandomBotMove(this.props.values);
            } else {
              pos = this.makeGreedyBotMove(this.props.values);
            }
            
            if (pos !== null) {
              setTimeout(() => {this.props.playMove(pos[0],pos[1]);}, this.props.mode === 'BxB' ? 2 : 500);
            }
          }
      }
    }
    if (this.props.gameOver && (this.props.stateHistory.length > 0 || this.props.mode === 'HxH')) {
      if (this.props.winner === this.props.symbol) {
        this.wins += 1;
        if (this.props.mode === 'HxB') {
          if (this.props.isBot) {
            alert('Bot won !');
          } else {
            alert('Human won !');
          }
        }
      }
      if (this.props.isBot) {
        // Game is over. update values
        let tmp = this.props.winner === this.props.symbol ? 1 : 0; // if we won it's 1 else it's 0
        let stateValPairs = [], s;
        let valueOfStatesCopy = new Map(this.props.symbol === 1 ? this.props.valueOfStatesFor1 : this.props.valueOfStatesFor2);
        for (let i = (this.props.stateHistory.length - 1) ; i >= 0 ; i--) { // loop through array backward
          s = this.props.stateHistory[i];
          tmp = valueOfStatesCopy.get(s) + this.props.alpha*(tmp - valueOfStatesCopy.get(s));
          if (tmp > 1) {
            console.log(`WTF ! tmp = ${tmp}`);
          }
          valueOfStatesCopy.set(s, tmp);
          stateValPairs.push([s, tmp]);
        }
        if (this.props.mode === 'HxB') {
          console.log(this.props.stateHistory);
          console.log(this.props.symbol === 1 ? this.props.valueOfStatesFor1 : this.props.valueOfStatesFor2);
        }
        this.props.changeValuesOfStates(this.props.symbol, stateValPairs);
      }
    }
  }

  render() {

    return (
      <div className={`Player ${this.props.currentPlayer === this.props.symbol && this.props.mode !== 'BxB'  ? 'active' : ''} ${this.props.symbol === 1 ? 'red' : 'blue'} ${this.props.isLeft ? 'left' : 'right'}`}>
        <p>{this.props.mode !== 'BxB' ? `Wins: ${this.wins}` : ''}</p>
          <img className={`icon ${this.props.isLeft ? 'flipped' : ''}`} src={this.props.isBot ? 'assets/bot.png' : 'assets/human.png'} alt={this.props.isBot ? 'bot-player' : 'human-player'} />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
            gameOver : state.app.gameOver,
            mode: state.app.mode,
            currentPlayer: state.app.currentPlayer,
            currentPlayerIsBot: state.app.currentPlayerIsBot,
            winnerToStates: state.app.winnerToStates,
            values: state.app.values,
            stateHistory: state.app.stateHistory,
            winner: state.app.winner,
            valueOfStatesFor1: state.app.valueOfStatesFor1,
            valueOfStatesFor2: state.app.valueOfStatesFor2,
        };
};


const mapDispatchToProps = (dispatch) => {
    return {
        playMove: (i,j) => { dispatch(playMoveAction(i, j)) },
        changeValuesOfStates: (symbol, stateValPairs) => { dispatch(changeValuesOfStatesAction(symbol, stateValPairs)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
