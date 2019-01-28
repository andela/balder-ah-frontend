import React from 'react';
import { render, fireEvent, wait } from 'react-testing-library';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from '../../utils/axiosInstance';
import reducers from '../../reducers';
import CommentForm from './CommentForm';
import { commentOnArticle } from '../../actions/articles';


const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const store = createStore(reducers, { auth: { isLoggedIn: true } }, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/'] });
const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,

});
const dispatch = jest.fn();
const actions = {
  [commentOnArticle]: commentOnArticle,
};

actions.commentOnArticle = jest.fn();

const articleSlug = 'fake-article-slug';

describe('<CommentForm />', () => {
  let CommentFormComponent;
  let commentBox;
  let commentButton;

  beforeEach(() => {
    const ui = (
      <Router history={history}>
        <CommentForm id="comment" articleSlug={articleSlug} />
      </Router>
    );
    CommentFormComponent = renderWithRedux(ui, store);
    const { getByText, container } = CommentFormComponent;
    commentButton = getByText(/add comment/i);
    commentBox = container.querySelector('textarea[name=comment]');
  });

  afterEach(() => {
    dispatch.mockRestore();
    actions.commentOnArticle.mockRestore();
    axiosMock.reset();
  });

  afterAll(axiosMock.restore);

  test('it renders', () => {
    expect(commentButton).toBeInTheDocument();
    expect(commentBox).toBeInTheDocument();
  });

  test('it post comment successfully', async () => {
    fireEvent.change(commentBox, { target: { value: 'Testing comment 123' } });
    await axiosMock.onPost().replyOnce(200);
    fireEvent.click(commentButton);
    await commentOnArticle()(dispatch);
    expect(dispatch).toHaveBeenCalledTimes(1);
    await wait(() => expect(commentBox.value).toBe(''));
  });
});
