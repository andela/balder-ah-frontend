import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import ViewArticle from './ViewArticle';
import renderWithRouter from '../../__mocks__/helpers';
import reducers from '../../reducers';

describe('<ViewArticle />', () => {
  const props = {
    getArticle: jest.fn(),
    tags: ['tag1', 'tag2', 'tag3'],
    message: 'Article retrieved successfully',
    article: {
      id: 1,
      author: { username: 'juwon' },
      title: 'boom boom',
      tags: ['one', 'two'],
    },
    match: {
      params: {
        slug: 'random-slug-ok',
      },
    },
    author: { username: 'juwon', bio: null, image: null },
    isLike: false,
    unlike: jest.fn(),
    like: jest.fn(),
    articleTitle: 'I want them thingy',
  };

  const store = createStore(reducers, (applyMiddleware(thunk)));
  const connectedComponent = <Provider store={store}><ViewArticle {...props} /></Provider>;

  test('should render correctly', () => {
    renderWithRouter(connectedComponent);
    expect(props.tags).toEqual(['tag1', 'tag2', 'tag3']);
  });
});
