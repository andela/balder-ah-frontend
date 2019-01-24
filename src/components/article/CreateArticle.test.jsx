import React from 'react';
import 'jest-dom/extend-expect';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { wait, fireEvent, waitForDomChange } from 'react-testing-library';
import CreateArticle from './CreateArticle';
import reducers from '../../reducers';
import axiosInstance from '../../utils/axiosInstance';
import { renderWithRedux } from '../../__mocks__/helpers';

createStore(reducers, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/create-article'] });
history.push = jest.fn();
const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe('<CreateArticle />', () => {
  afterEach(() => {
    axiosMock.reset();
    history.push.mockReset();
  });
  afterAll(() => {
    axiosMock.restore();
    history.push.mockRestore();
  });

  test('should render correctly', async () => {
    const ui = (
      <Router history={history}>
        <CreateArticle />
      </Router>
    );
    const { getByText } = renderWithRedux(ui, {
      initialState: { auth: { isLoggedIn: true } },
    });
    expect(getByText(/Create your article/i)).toBeInTheDocument();
  });

  test('should fill form and create article', async () => {
    const ui = (
      <Router history={history}>
        <CreateArticle />
      </Router>
    );

    const { getByLabelText, container } = renderWithRedux(ui, {
      initialState: { auth: { isLoggedIn: true } },
    });

    const title = getByLabelText(/title/i);
    const articleBody = getByLabelText(/body/i);
    const tags = getByLabelText(/tags/i);
    const submitButton = container.querySelector('button[type=submit]');

    fireEvent.change(title, { target: { value: 'This is the title' } });
    fireEvent.change(articleBody, {
      target: { value: 'Was supposed to be a real article body. 💩' },
    });
    fireEvent.change(tags, { target: { value: 'javascript,romance' } });
    const responsePayload = {
      newArticle: { slug: 'awesome-slug', message: 'article created successfully' },
    };
    axiosMock.onPost().replyOnce(200, responsePayload);
    fireEvent.click(submitButton);
    await wait(() => expect(history.push).toHaveBeenCalledWith(`/articles/${responsePayload.newArticle.slug}`));
  });

  test('should fail to create article', async () => {
    const ui = (
      <Router history={history}>
        <CreateArticle />
      </Router>
    );

    const { getByLabelText, container, getByText } = renderWithRedux(ui, {
      initialState: { auth: { isLoggedIn: true } },
    });

    const title = getByLabelText(/title/i);
    const articleBody = getByLabelText(/body/i);
    const tags = getByLabelText(/tags/i);
    const submitButton = container.querySelector('button[type=submit]');

    fireEvent.change(title, { target: { value: 'This is the title' } });
    fireEvent.change(articleBody, {
      target: { value: 'Was supposed to be a real article body. 💩' },
    });
    fireEvent.change(tags, { target: { value: 'javascript,romance' } });
    axiosMock.onPost().replyOnce(500, { errors: { body: ['failed to create article'] } });
    fireEvent.click(submitButton);
    await waitForDomChange({ container });
    expect(getByText(/failed to create article/i)).toBeInTheDocument();
  });
});
