import React, { Component } from 'react';
import { connect } from 'react-redux';

import { playMoveAction } from '../actions/app';

import '../styles/Player.css';


class Player extends Component {

  onTrainClick = (ev) => {
    alert('train');
  };


  componentDidUpdate(prevProps) {
    if (this.props.isBot && this.props.currentPlayerIsBot) {
      //console.log('Bot will make move')
      this.props.playMove(-1,-1);
      if (this.props.currentPlayer === this.props.symbol) {

         
      }
    }
  }

  render() {
    let trainButton;
    if (this.props.isBot) {
      trainButton = <div><button onClick={this.onTrainClick}>Train Bot !</button></div>;
    }
    return (
      <div className={`Player ${this.props.currentPlayer === this.props.symbol ? 'active' : ''}`}>
        {
          trainButton
        }
        <div className="icon">
          <img src={this.props.isBot ? 'assets/bot.png' : 'assets/human.png'} alt={this.props.isBot ? 'bot-player' : 'human-player'} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
            currentPlayer: state.app.currentPlayer,
            currentPlayerIsBot: state.app.currentPlayerIsBot
        };
};


const mapDispatchToProps = (dispatch) => {
    return {
        playMove: (i,j) => { dispatch(playMoveAction(i, j)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
