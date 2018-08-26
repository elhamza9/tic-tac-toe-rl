import React, { Component } from 'react';
import { connect } from 'react-redux';

import { playMoveAction } from '../actions/app';

import '../styles/Player.css';


class Player extends Component {

  constructor (props) {
    super(props);
    if ( props.isBot ) {
      this.state = {
        alpha: .5,
        eps: .1
      }
    } else {
      this.state = {

      };
    }
  }

  onTrainClick = (ev) => {
    alert('train');
  };


  componentDidUpdate(prevProps) {
    if (this.props.isBot) {
      if (this.props.currentPlayer === this.props.symbol) {
         this.props.playMove(-1,-1);
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
        };
};


const mapDispatchToProps = (dispatch) => {
    return {
        playMove: (i,j) => { dispatch(playMoveAction(i, j)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Player);
