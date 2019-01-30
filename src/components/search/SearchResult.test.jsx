import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import { wait, fireEvent } from 'react-testing-library';
import { renderWithRedux } from '../../__mocks__/helpers';
import SearchResult from './SearchResult';
import axios from '../../utils/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const history = createMemoryHistory({ initialEntries: ['/search?q=haven'] });

describe('<SearchResult />', () => {
  const location = {
    search: '?q=haven',
  };
  const ui = (
    <Router history={history}>
      <SearchResult location={location} />
    </Router>
  );

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('performs a search on componentDidMount', async () => {
    axiosMock.onGet().replyOnce(200, {
      articles: [{
        id: 1,
        slug: 'nice-slug',
        description: 'short',
        title: 'Nice Slug',
        author: { username: 'johndoe' },
        tags: [{ name: 'javascript' }],
      }],
    });

    const { getByText } = renderWithRedux(ui);
    await wait(() => expect(getByText(/nice slug/i)).toBeInTheDocument());
    expect(getByText(/nice slug/i)).toBeInTheDocument();
  });

  test('returns empty array for search query', async () => {
    axiosMock.onGet().replyOnce(200, {
      articles: [],
    });
    const { getByText } = renderWithRedux(ui);
    expect(getByText(/no results/i)).toBeInTheDocument();
  });

  test('fails to search empty input field', async () => {
    axiosMock.onGet().replyOnce(500);
    const { container } = renderWithRedux(ui);
    const form = container.querySelector('form.search-form');
    fireEvent.submit(form);
  });

  test('fill search input and submit', async () => {
    const searchWithRouter = (
      <Router history={history}>
        <SearchResult location={{ search: '' }} />
      </Router>
    );
    const { container, getByText } = renderWithRedux(searchWithRouter);


    const searchInput = container.querySelector('form.search-form input.search');
    const form = container.querySelector('form.search-form');
    const query = 'react vs vue';
    axiosMock.onGet().replyOnce(200, {
      articles: [{
        id: 4,
        slug: 'react-vs-vue',
        description: 'the showdown',
        title: 'React Vs. Vue',
        author: { username: 'foobar' },
        tags: [{ name: 'react' }],
      }],
    });
    fireEvent.change(searchInput, { target: { value: query } });
    fireEvent.submit(form);

    await wait(() => getByText(/the showdown/i));
  });
});
