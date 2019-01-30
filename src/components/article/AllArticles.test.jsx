import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent, wait } from 'react-testing-library';
import { Provider } from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import reducers from '../../reducers';
import AllArticles from './AllArticles';
import axios from '../../utils/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

const store = createStore(reducers, applyMiddleware(thunk));
const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

describe('Get All Articles', () => {
  let AllArticlesComponent;

  beforeEach(() => {
    axiosMock.onGet().replyOnce(200, {
      allArticles: [
        {
          id: 12,
          title: 'fake article',
          imgUrl: 'c',
          description: 'dgkx',
          author: { username: 'shifu' },
          tags: ['shdgd'],
        },
      ],
      message: 'All articles found successfully',
    });
    const ui = (
      <MemoryRouter>
        <AllArticles />
      </MemoryRouter>
    );
    AllArticlesComponent = renderWithRedux(ui, store);
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it fetches all articles on componentDidMount', async () => {
    const { getByText } = AllArticlesComponent;
    await wait(() => expect(getByText(/fake article/i)).toBeInTheDocument());
  });

  test('it fetches new articles on button click', async () => {
    const { getByText, queryByText } = AllArticlesComponent;
    axiosMock.onGet().replyOnce(200, {
      allArticles: [
        {
          id: 1,
          title: 'another writeup',
          imgUrl: 'c',
          description: 'dgkx',
          author: { username: 'shifu' },
          tags: ['shdgd'],
        },
      ],
      message: 'All articles found successfully',
    });
    fireEvent.click(getByText('2'));
    axiosMock.onGet().replyOnce(500, { errors: { body: ['an error occurred'] } });
    fireEvent.click(getByText('3'));
    await wait(() => expect(getByText(/another writeup/i)).toBeInTheDocument());
    expect(queryByText(/fake article/)).not.toBeInTheDocument();
  });
});
