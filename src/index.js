
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

import App  from './App';

import rootReducer from './redux/reducers/index';

import './styles/index.css';

const appStore = createStore(rootReducer);

ReactDOM.render(
    <Provider store={appStore}>
      <App />
    </Provider>, document.getElementById('root'));
registerServiceWorker();


