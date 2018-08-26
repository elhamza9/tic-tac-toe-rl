import React, { Component } from 'react';
import { connect } from 'react-redux';

import Arena from './components/arena';
import Menu from './components/menu';

import './styles/App.css';

class App extends Component {

  constructor (props) {
    super(props);
  }

  render() {
    let comp;
    if ( this.props.arenaIsVisible ) {
      comp = <Arena />
    } else {
      comp = <Menu />
    }
    return (
      <div className="App">
        <h1>Play TIC TAC TOE !</h1>
        {comp}
      </div>
    );

  }
}

const mapStateToProps = (state) => {
  return {
    arenaIsVisible: state.app.arenaIsVisible
  };
}


export default connect(mapStateToProps, null) (App);
