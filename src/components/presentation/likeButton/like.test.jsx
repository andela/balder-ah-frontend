import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import reducers from '../../../reducers/index';
import Like from './Like';
import axiosInstance from '../../../utils/axiosInstance';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));

const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

const isLike = false;
const handleClick = jest.fn();

describe('Like Article', () => {
  let LikeComponent;

  beforeEach(() => {
    LikeComponent = renderWithRedux(<Like isLike={isLike} handleClick={handleClick} />, store);
  });
  afterEach(axiosMock.restore);
  test('should render the page', async () => {
    const { container } = LikeComponent;
    const likeButton = container.querySelector('i.material-icons');
    expect(likeButton).toBeInTheDocument();
    fireEvent.click(likeButton);
  });
});
