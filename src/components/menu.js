import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setArenaAction } from '../actions/app';

import '../styles/Menu.css';

class Menu extends Component {

  constructor (props) {
    super(props);
  }

  onItemClick =  (ev) => {
      let id = ev.target.id;
      if ( id === 'humanvshuman' ) {
        this.props.showArena('HxH');
      } else if ( id === 'humanvsbot' ) {
        this.props.showArena('HxB');
      } else {
          alert('Unknown Menu Item clicked');
      }
  }

  render() {
    return (
      <div className="Menu">
          <div>
              <div id="humanvsbot" className="item" onClick={this.onItemClick}>
                <p>Human vs Robot</p>
              </div>
              <div id="humanvshuman" className="item" onClick={this.onItemClick}>
                <p>Human vs Human</p>
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