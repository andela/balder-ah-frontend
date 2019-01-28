import React from 'react';
import { fireEvent, wait, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter } from 'react-router-dom';
import AllArticles from './AllArticles';
import axios from '../../utils/axiosInstance';
import { renderWithRedux } from '../../__mocks__/helpers';
import { bookmarkArticle, unbookmarkArticle } from '../../actions/reactions/bookmark';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const dispatch = jest.fn();
const actions = {
  bookmarkArticle,
  unbookmarkArticle,
};

actions.bookmarkArticle = jest.fn();
actions.unbookmarkArticle = jest.fn();

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
          bookmarked: false,
        },
        {
          id: 13,
          title: 'fake article',
          imgUrl: 'c',
          description: 'dgkx',
          author: { username: 'props' },
          tags: ['shdgd'],
          bookmarked: true,
        },
      ],
      message: 'All articles found successfully',
    });
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);
  afterEach(jest.resetAllMocks);

  test('it fetches all articles on componentDidMount', async () => {
    const ui = (
      <MemoryRouter>
        <AllArticles />
      </MemoryRouter>
    );
    AllArticlesComponent = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: true } } });
    const { getByText } = AllArticlesComponent;
    await wait(() => expect(getByText(/fake article/i)).toBeInTheDocument());
  });

  test('it fetches new articles on button click', async () => {
    const ui = (
      <MemoryRouter>
        <AllArticles />
      </MemoryRouter>
    );
    AllArticlesComponent = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: true } } });
    axiosMock.onGet().replyOnce(200, {
      allArticles: [
        {
          id: 1,
          title: 'another writeup',
          imgUrl: 'c',
          description: 'dgkx',
          author: { username: 'shifu' },
          tags: ['shdgd'],
          bookmarked: true,
        },
      ],
      message: 'All articles found successfully',
    });

    const { getByText, queryByText, container } = AllArticlesComponent;
    await waitForDomChange({ container });
    fireEvent.click(getByText('2'));
    axiosMock.onGet().replyOnce(500, { errors: { body: ['an error occurred'] } });
    fireEvent.click(getByText('3'));
    await wait(() => expect(getByText(/another writeup/i)).toBeInTheDocument());
    expect(queryByText(/fake article/)).not.toBeInTheDocument();
  });

  test('should render correctly with bookmark button with user not logged in', async () => {
    const ui = (
      <MemoryRouter>
        <AllArticles />
      </MemoryRouter>
    );
    AllArticlesComponent = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: false } } });
    const { container } = AllArticlesComponent;
    await waitForDomChange({ container });

    const bookmarkBtn = container.querySelector('i.material-icons.bookmark-style');
    fireEvent.click(bookmarkBtn);
    expect(dispatch).not.toHaveBeenCalledTimes(1);
  });

  test('should render correctly with bookmark button with user logged in', async () => {
    const ui = (
      <MemoryRouter>
        <AllArticles />
      </MemoryRouter>
    );
    AllArticlesComponent = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: true } } });
    const { container } = AllArticlesComponent;
    await waitForDomChange({ container });

    const bookmarkBtn = container.querySelector('i.material-icons.bookmark-style');
    await axiosMock.onPost().replyOnce(200);
    fireEvent.click(bookmarkBtn);
    await bookmarkArticle()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('should render correctly with unbookmark button with user logged in', async () => {
    const ui = (
      <MemoryRouter>
        <AllArticles />
      </MemoryRouter>
    );

    AllArticlesComponent = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: true } } });
    const { container } = AllArticlesComponent;
    await waitForDomChange({ container });

    const unbookmarkBtn = container.querySelector('i.material-icons.unbookmark-style');
    await axiosMock.onDelete().replyOnce(200);
    fireEvent.click(unbookmarkBtn);
    await unbookmarkArticle()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });
});
