import React, { Component } from 'react';
import { connect } from 'react-redux';
import { playMoveAction } from '../actions/app';

import '../styles/Board.css';

class Board extends Component {

  getSymbol = (i) => {
      if ( i === 1 ) {
        return 'X';
      } else if ( i === 2 ) {
          return 'O';
      } else {
          return '';
      }
  }

  onSquareClick =  (ev) => {
      if (this.props.clickable) {
        // get coordinates
        let coordinates = ev.target.id.split('');
        if (coordinates.length !== 2) {
            alert('Cell ID format invalid');
            return;
        }
        coordinates[0] = parseInt(coordinates[0]);
        coordinates[1] = parseInt(coordinates[1]);
        
        // If empty play move
        if (this.props.boardValues[coordinates[0]][coordinates[1]] === 0) {
            this.props.playMove(coordinates[0], coordinates[1]);
        } else {
            alert('choose an empty square')
        }
        
      } else {
          alert('Board not clickable');
      }
  }

  getClassName = (symbol) => {
    return symbol === 1 ? 'cross' : 'circle';
  }


  render() {
    return (
      <div className="Board">
        <table className={`${this.props.clickable ? 'clickable' : ''} ${this.props.gameOver ? 'hidden': ''}`}>
          <tbody>
            <tr>
              <td id="00" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[0][0])}>{this.getSymbol(this.props.boardValues[0][0])}</td>
              <td id="01" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[0][1])}>{this.getSymbol(this.props.boardValues[0][1])}</td>
              <td id="02" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[0][2])}>{this.getSymbol(this.props.boardValues[0][2])}</td>
            </tr>
            <tr>
              <td id="10" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[1][0])}>{this.getSymbol(this.props.boardValues[1][0])}</td>
              <td id="11" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[1][1])}>{this.getSymbol(this.props.boardValues[1][1])}</td>
              <td id="12" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[1][2])}>{this.getSymbol(this.props.boardValues[1][2])}</td>
            </tr>
            <tr>
              <td id="20" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[2][0])}>{this.getSymbol(this.props.boardValues[2][0])}</td>
              <td id="21" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[2][1])}>{this.getSymbol(this.props.boardValues[2][1])}</td>
              <td id="22" onClick={this.onSquareClick} className={this.getClassName(this.props.boardValues[2][2])}>{this.getSymbol(this.props.boardValues[2][2])}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
            boardValues: state.app.values,
            clickable: state.app.boardIsClickable,
            gameOver: state.app.gameOver
        };
};

const mapDispatchToProps = (dispatch) => {
    return {
        playMove: (i,j) => { dispatch(playMoveAction(i, j)) },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
