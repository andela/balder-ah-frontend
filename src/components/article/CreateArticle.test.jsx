import React from 'react';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { wait, fireEvent, render } from 'react-testing-library';
import CreateArticle from './CreateArticle';
import reducers from '../../reducers';
import axiosInstance from '../../utils/axiosInstance';

const store = createStore(reducers, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/', '/login'] });
history.push = jest.fn();
const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });

const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

describe('<CreateArticle />', () => {
  afterEach(() => {
    axiosMock.reset();
    history.push.mockReset();
  });
  afterAll(() => {
    axiosMock.restore();
    history.push.mockRestore();
  });

  test('should render correctly', () => {
    const ui = (
      <Router history={history}>
        <CreateArticle />
      </Router>
    );
    const { getByText } = renderWithRedux(ui, store);
    expect(getByText(/Create your article/i)).toBeInTheDocument();
  });

  test('should render correctly', () => {
    const ui = (
      <Router history={history}>
        <CreateArticle />
      </Router>
    );

    renderWithRedux(ui, store);
    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith('/login');
  });

  test('should fill form and create article', async () => {
    const ui = (
      <Router history={history}>
        <CreateArticle />
      </Router>
    );
    const withInitialState = createStore(
      reducers,
      { auth: { isLoggedIn: true } },
      applyMiddleware(thunk),
    );
    const { getByLabelText, container } = renderWithRedux(ui, withInitialState);

    const title = getByLabelText(/title/i);
    const articleBody = getByLabelText(/body/i);
    const tags = getByLabelText(/tags/i);
    const submitButton = container.querySelector('button[type=submit]');

    fireEvent.change(title, { target: { value: 'This is the title' } });
    fireEvent.change(articleBody, { target: { value: 'Was supposed to be a real article body. 💩' } });
    fireEvent.change(tags, { target: { value: 'javascript,romance' } });
    const responsePayload = { newArticle: { slug: 'awesome-slug', message: 'article created successfully' } };
    axiosMock.onPost().replyOnce(200, responsePayload);
    fireEvent.click(submitButton);
    await wait(() => expect(history.push).toHaveBeenCalledWith(`/articles/${responsePayload.newArticle.slug}`));
  });
});
