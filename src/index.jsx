import React from 'react';
import ReactDOM from 'react-dom';
import { config } from 'dotenv';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'toastr/toastr.scss';
import 'normalize.css';
import 'toastr/toastr.scss';
import './assets/sass/base.scss';
import reducers from './reducers';
import App from './App';

config();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('root'));
