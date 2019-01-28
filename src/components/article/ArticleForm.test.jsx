import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import ArticleForm from './ArticleForm';

const store = createStore(reducers, applyMiddleware(thunk));
const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

describe('Article Form', () => {
  let titleField;
  let bodyField;
  let tagsField;
  let submitButton;
  let ArticleFormComponent;

  beforeEach(() => {
    ArticleFormComponent = renderWithRedux(<ArticleForm />, store);
    titleField = ArticleFormComponent.getByLabelText('Title');
    bodyField = ArticleFormComponent.getByLabelText('Body');
    tagsField = ArticleFormComponent.getByPlaceholderText('Add your tags here (e.g tag1, tag2, tag3)');
    submitButton = ArticleFormComponent.container.querySelector('button[type=submit]');
  });

  const props = {
    title: 'this is the main title',
    body: 'body of the article',
    tags: 'tag1, tag2, tag3',
    btnValue: 'create article',
  };

  const connectedComponent = <Provider store={store}><ArticleForm {...props} /></Provider>;

  test('it renders all form inputs', () => {
    expect(titleField).toBeInTheDocument();
    expect(bodyField).toBeInTheDocument();
    expect(tagsField).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('fill and submit form with error', async () => {
    const { getByText } = ArticleFormComponent;
    expect(getByText('Title')).toBeInTheDocument();
    expect(getByText('Body')).toBeInTheDocument();
    expect(getByText('Tags')).toBeInTheDocument();
  });

  test('should handle form inputs correctly', () => {
    const { getByLabelText } = render(connectedComponent);

    fireEvent.change(getByLabelText('Title'), { target: { value: 'Main title' } });
    expect(getByLabelText('Title').value).toBe('Main title');

    fireEvent.change(getByLabelText(/body/i), { target: { value: 'This is the body' } });
    expect(getByLabelText(/body/i).value).toBe('This is the body');

    fireEvent.change(getByLabelText('Tags'), { target: { value: 'This is the body' } });
    expect(getByLabelText('Tags').value).toBe('This is the body');
  });
});
