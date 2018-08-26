import React, { Component } from 'react';
import { connect } from 'react-redux';

import Board from './board';
import Player from './player'

import { setArenaAction, cleanBoardAction, startGameAction } from '../actions/app';

import '../styles/Arena.css';

class Arena extends Component {

  constructor (props) {
    super(props);
    this.state = {
      botSymbol: 1
    };
  }

  onBackClick = (ev) => {
    this.props.cleanBoard();
    this.props.hideArena();
  }

  startGameClick = (ev) => {
    if ( this.props.mode === 'HxB' ) {
      let ret = window.confirm('Do you want Bot to start ?');
      if (ret) {
        this.setState({
          botSymbol: 1
        });
      } else {
        this.setState({
          botSymbol: 2
        });
      }
    }
    this.props.startGame();
  }


  render() {
    return (
      <div className="Arena">
        <div>
            <button onClick={this.onBackClick}>Back to Menu</button>
        </div>
        <div>
            <button onClick={this.startGameClick}>Start Game</button>
        </div>
        <div>
            <Player isBot={false} symbol={this.state.botSymbol === 1 ? 2 : 1} />
            <Board />
            <Player isBot={this.props.mode === 'HxB' ? true : false} symbol={this.state.botSymbol} />
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
            mode: state.app.mode,
            currentPlayer: state.app.currentPlayer,
        };
};


const mapDispatchToProps = (dispatch) => {
    return {
        hideArena: () => { dispatch(setArenaAction('HxH', false)) },
        cleanBoard: () => { dispatch(cleanBoardAction())},
        startGame: () => { dispatch(startGameAction(true))},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
