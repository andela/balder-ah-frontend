import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';

const renderWithRouter = (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

export const renderWithRedux = (
  ui,
  { initialState, store = createStore(reducers, initialState, applyMiddleware(thunk)) } = {},
) => ({
  ...render(<Provider store={store}>{ui}</Provider>),
  store,
});

export default renderWithRouter;
