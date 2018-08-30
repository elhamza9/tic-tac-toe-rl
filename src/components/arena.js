import React, { Component } from 'react';
import { connect } from 'react-redux';

import Board from './board';
import Player from './player'

import { setArenaAction, startGameAction } from '../redux/actions/app';

import '../styles/Arena.css';

class Arena extends Component {

  constructor (props) {
    super(props);
    this.state = {
      botSymbol: 0,
      nbrTraningEpisodes: 0, // if mode is BxB ( training ) count the episodes
      nbrDisplayedTraningEpisodes: 0, // I display nbr every 100 episodes
      maxNbrTraningEpisodes: 2000,
    };
    this.newGameBtn = React.createRef();
  }

  onBackClick = (ev) => {
    this.props.hideArena();
    this.props.startGame(false);
  }

   onNewGameClick = (ev) => {
    let nextIsBot = false;
    if ( this.props.mode === 'HxB' ) {
      nextIsBot = window.confirm('Do you want Bot to start ?');
      this.setState({
        botSymbol: nextIsBot ? 1 : 2
      });
    } else if ( this.props.mode === 'BxB') {
      nextIsBot = true;
    }
    this.props.startGame(nextIsBot);
  }

  componentDidMount () {
    if (this.props.mode === 'BxB') {
      let ret = prompt("How many training matches you want the bots to play ? ", "2000");
        let n = parseInt(ret, 10);
        if (isNaN(n) || n === undefined) {
          n = 2000;
        }
        this.setState({
          ...this.state,
          maxNbrTraningEpisodes: n
        });
    }
  }
  componentDidUpdate() {
    if (this.props.mode === 'BxB' && this.props.gameOver && this.state.nbrTraningEpisodes < this.state.maxNbrTraningEpisodes) {
      let newVal = this.state.nbrTraningEpisodes+1;
      this.setState({
        nbrTraningEpisodes: newVal,
        nbrDisplayedTraningEpisodes: newVal%100 === 0 ? newVal : this.state.nbrDisplayedTraningEpisodes
      });
      this.newGameBtn.current.click();
    }
  }

  render() {
    return (
      <div className="Arena">
        <div className="top">
            <button id="back-btn"  onClick={this.onBackClick}>&larr; BACK</button>
            <button id="newgame-btn" ref={this.newGameBtn} disabled={this.props.newGameBtnIsVisible ? false : true} className={this.props.newGameBtnIsVisible ? '' : 'hidden'} onClick={this.onNewGameClick}>{`${this.props.mode === 'BxB' ? 'Start Training !' : 'New Game !'}`}</button>
            <div className={`training ${this.props.mode !== 'BxB' || ( this.props.mode === 'BxB' && this.props.newGameBtnIsVisible) ? 'hidden' : ''}`}>
              <p>Training . . .</p>
              <p>{`${this.state.nbrDisplayedTraningEpisodes} / ${this.state.maxNbrTraningEpisodes} episodes`}</p>
            </div>
        </div>
        <div className="bottom">
              <Player isBot={this.props.mode === 'BxB' ? true : false}
                      symbol={(this.props.mode === 'BxB' || this.props.mode === 'HxH') ? 1 : this.state.botSymbol === 1 ? 2 : 1 }
                      alpha={.5}
                      eps={.2}
                      isLeft={true} />
              <Board />
              <Player isBot={( this.props.mode === 'HxB' || this.props.mode === 'BxB') ? true : false}
                      symbol={(this.props.mode === 'BxB' || this.props.mode === 'HxH') ? 2 : this.state.botSymbol }
                      alpha={.5}
                      eps={.2}
                      isLeft={false} />
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
