import React from 'react';
import { Router } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory } from 'history';
import { waitForDomChange, fireEvent } from 'react-testing-library';
import ViewArticle from './ViewArticle';
import axios from '../../utils/axiosInstance';
import { renderWithRedux } from '../../__mocks__/helpers';
import { unbookmarkArticle } from '../../actions/reactions/bookmark';


const dispatch = jest.fn();
const actions = {
  unbookmarkArticle,
};

actions.unbookmarkArticle = jest.fn();

const history = createMemoryHistory({ initialEntries: ['/articles'] });
const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

describe('<ViewArticle />', () => {
  const ui = (
    <Router history={history}>
      <ViewArticle />
    </Router>
  );

  test('should render correctly', async () => {
    axiosMock.onGet().replyOnce(200, {
      getOneArticle: {
        id: 1,
        title: 'Awesome',
        body: 'this is just a good body',
        createdAt: '2019-01-18T10:28:03.853Z',
        bookmarked: false,
        author: { username: 'shifu' },
        favorited: false,
      },
    });

    const { container, getByText } = renderWithRedux(
      ui,
      { initialState: { auth: { isLoggedIn: true } } },
    );
    await waitForDomChange({ container });

    expect(getByText('Awesome')).toBeInTheDocument();
    expect(getByText('this is just a good body')).toBeInTheDocument();
    expect(getByText('Fri Jan 18 2019 by shifu')).toBeInTheDocument();
  });

  test('should render correctly with bookmark and unbookmark button', async () => {
    axiosMock.onGet().replyOnce(200, {
      getOneArticle: {
        id: 1, title: 'Awesome', bookmarked: false, author: { username: 'shifu' }, favorited: false,
      },
    });

    const { container } = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: true } } });
    await waitForDomChange({ container });
    const bookmarkBtn = container.querySelector('i.material-icons.bookmark-style');
    await axiosMock.onPost().replyOnce(200);
    expect(bookmarkBtn).toBeInTheDocument();
    fireEvent.click(bookmarkBtn);

    await waitForDomChange({ container });
    const unBookmarkBtn = container.querySelector('i.material-icons.unbookmark-style');
    expect(unBookmarkBtn).toBeInTheDocument();

    await axiosMock.onDelete().replyOnce(200);
    fireEvent.click(unBookmarkBtn);
    await unbookmarkArticle()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
  });

  test('should render correctly with like and unlike button', async () => {
    axiosMock.onGet().replyOnce(200, {
      getOneArticle: {
        id: 1, title: 'Awesome', bookmarked: false, author: { username: 'shifu' }, favorited: false,
      },
      isLike: false,
    });

    const { container } = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: true } } });
    await waitForDomChange({ container });
    const likeBtn = container.querySelector('i.material-icons.like-style-unliked');
    expect(likeBtn).toBeInTheDocument();
    await axiosMock.onPost().replyOnce(200);
    fireEvent.click(likeBtn);

    await waitForDomChange({ container });
    const unlikeBtn = container.querySelector('i.material-icons.like-style-liked');
    expect(unlikeBtn).toBeInTheDocument();
  });
});
