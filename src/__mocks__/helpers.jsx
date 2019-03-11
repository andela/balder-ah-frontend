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

export const articles = {
  allArticles: [{
    id: 1,
    title: 'something funny',
    slug: 'something-funny',
    author: { username: 'johndoe' },
    imgUrl: 'https://img.io',
    tags: [{ name: '' }],
  }, {
    id: 2,
    title: 'other article',
    slug: 'other-article',
    author: { username: 'janedoe' },
    imgUrl: 'https://img.io',
    tags: [{ name: '' }],
  }],
};
export const comments = {
  comments: [{
    id: 1,
    userId: 1,
    body: 'First comment',
    edited: false,
    author: { id: 1, username: 'johndoe', image: 'avatar.png' },
    createdAt: '2019-01-23T23:21:33.874Z',
  },
  {
    id: 2,
    userId: 2,
    body: 'Second comment',
    edited: true,
    author: { id: 2, username: 'janedoe', image: 'avatar.png' },
    createdAt: '2019-01-23T23:22:33.874Z',
  },
  ],
};

export default renderWithRouter;
