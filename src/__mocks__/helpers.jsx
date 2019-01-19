import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from 'react-testing-library';

export const renderWithRouter = (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

export const placeholder = {};
