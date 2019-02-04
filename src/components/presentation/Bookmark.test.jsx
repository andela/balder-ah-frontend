import React from 'react';
import { fireEvent } from 'react-testing-library';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Bookmark from './Bookmark';
import reducers from '../../reducers';
import { renderWithRedux } from '../../__mocks__/helpers';

const store = createStore(reducers, { auth: { isLoggedIn: true } }, applyMiddleware(thunk));

describe('<Bookmark />', () => {
  let bookmarkComponent;

  const props = {
    handleBookmarkClick: jest.fn(),
    isBookmarked: false,
  };

  beforeEach(() => {
    bookmarkComponent = renderWithRedux(<Bookmark {...props} />, store);
  });

  test('it renders properyly', () => {
    const { container } = bookmarkComponent;
    const bookmarkButton = container.querySelector('i.material-icons');
    expect(bookmarkButton).toBeInTheDocument();
    fireEvent.click(bookmarkButton);
  });
});
