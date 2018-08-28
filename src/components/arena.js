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
    this.newGameBtn = React.createRef();
    //this.componentDidMount = this.componentDidMount.bind(this);
  }

  onBackClick = (ev) => {
    //this.props.cleanBoard();
    this.props.hideArena();
    this.props.startGame(false);
  }

   onNewGameClick = (ev) => {
    let nextIsBot = false;
    if ( this.props.mode === 'HxB' ) {
      nextIsBot = window.confirm('Do you want Bot to start ?');
    } else if ( this.props.mode === 'BxB') {
      nextIsBot = true;
    }
    this.props.startGame(nextIsBot);
  }


  render() {
    return (
      <div className="Arena">
        <div>
            <button  onClick={this.onBackClick}>Back to Menu</button>
        </div>
        <div>
            <button id="newgame-btn" className={this.props.newGameBtnIsVisible ? '' : 'hidden'} onClick={this.onNewGameClick}>Start Game</button>
        </div>
        <div>
            <Player isBot={this.props.mode === 'BxB' ? true : false} symbol={1} />
            <Board />
            <Player isBot={( this.props.mode === 'HxB' || this.props.mode === 'BxB') ? true : false} symbol={2} />
        </div>
      </div>
    );
  }

}


const mapStateToProps = (state) => {
  return {
            mode: state.app.mode,
            currentPlayer: state.app.currentPlayer,
            gameOver: state.app.gameOver,
            newGameBtnIsVisible: state.app.newGameBtnIsVisible,
        };
};


const mapDispatchToProps = (dispatch) => {
    return {
        hideArena: () => { dispatch(setArenaAction('HxH', false)) },
        startGame: (nextPlayerIsBot) => { dispatch(startGameAction(nextPlayerIsBot))},
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Arena);
