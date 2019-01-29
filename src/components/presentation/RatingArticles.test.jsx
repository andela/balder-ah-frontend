import React from 'react';
import { fireEvent, render } from 'react-testing-library';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ArticleRating from './RateArticles';
import reducers from '../../reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

describe('Get article rating from API', () => {
  const handleRatingClick = jest.fn();

  test('Test the click action', async () => {
    const {
      container,
    } = renderWithRedux(<ArticleRating handleRatingClick={handleRatingClick} />, store);

    const rateBtn = container.querySelector('path.star');

    fireEvent.click(rateBtn);
    expect(rateBtn).toBeInTheDocument();
  });
});
