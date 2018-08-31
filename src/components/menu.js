import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setArenaAction } from '../redux/actions/app';

import '../styles/Menu.css';

class Menu extends Component {


  onItemClick =  (ev) => {
      //if ()
      let id = ev.target.id;
      if ( id === 'humanvshuman' ) {
        this.props.showArena('HxH');
      } else if ( id === 'humanvsbot' ) {
        this.props.showArena('HxB');
      } else if ( id === 'botvsbot' ) {
        this.props.showArena('BxB');
      } else {
          alert('Unknown Menu Item clicked');
      }
  }

  render() {
    return (
      <div className="Menu">
          <div className="wrapper">
              <div id="humanvsbot" className="item" onClick={this.onItemClick}>
                <div className="subitem">
                    <p>HUMAN</p>
                    <p>vs</p>
                    <p>BOT</p>
                  </div>
              </div>
              <div id="humanvshuman" className="item" onClick={this.onItemClick}>
                <div className="subitem">
                  <p>HUMAN</p>
                  <p>vs</p>
                  <p>HUMAN</p>
                </div>
              </div>
              <div id="botvsbot" className="item" onClick={this.onItemClick}>
                <div className="subitem">
                  <p>BOT</p>
                  <p>vs</p>
                  <p>BOT</p>
                </div>
              </div>
          </div>
      </div>
    );
  }
}

/*
const mapStateToProps = (state) => {
  return {
            title: state.board.title,
            boardValues: state.board.values,
            clickable: state.board.clickable,
        };
};
*/

const mapDispatchToProps = (dispatch) => {
    return {
        showArena: (mode) => { dispatch(setArenaAction(mode, true)) }
    };
}

export default connect(null, mapDispatchToProps)(Menu);