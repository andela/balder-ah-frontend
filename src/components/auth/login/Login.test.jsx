import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent, wait } from 'react-testing-library';
import { Provider } from 'react-redux';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import reducers from '../../../reducers';
import Login from './Login';
import axiosInstance from '../../../utils/axiosInstance';
import auth from '../../../utils/auth';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));
const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

const fillSubmitForm = (emailField, passwordField, submitButton) => {
  fireEvent.change(emailField, { target: { value: 'johndoe@example.com' } });
  fireEvent.change(passwordField, { target: { value: 'mysecret' } });
  fireEvent.submit(submitButton);
};

describe('LoginForm', () => {
  let emailField;
  let passwordField;
  let submitButton;
  let LoginComponent;

  beforeEach(() => {
    LoginComponent = renderWithRedux(<Login />, store);
    emailField = LoginComponent.getByLabelText('Email');
    passwordField = LoginComponent.getByLabelText('Password');
    submitButton = LoginComponent.container.querySelector('button[type=submit]');
  });
  afterEach(axiosMock.restore);

  test('it renders form all inputs', () => {
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

    expect(submitButton.textContent).toBe('Login');
  });

  test('fill and submit form with error', async () => {
    const { getByText } = LoginComponent;

    await axiosMock.onPost().replyOnce(402, { message: 'Invalid login credentials' });
    // fill login form
    fillSubmitForm(emailField, passwordField, submitButton);
    await wait(() => expect(getByText('Invalid login credentials')));
    expect(getByText('Invalid login credentials')).toBeInTheDocument();
  });

  test('fill and submit form with success', async () => {
    const { getByText } = LoginComponent;

    await axiosMock
      .onPost()
      .replyOnce(200, { message: 'Welcome back johndoe', token: 'fakeToken' });
    // fill login form
    fillSubmitForm(emailField, passwordField, submitButton);

    await wait(() => expect(getByText('Welcome back johndoe')));

    expect(getByText('Welcome back johndoe')).toBeInTheDocument();
    expect(auth.getUserToken()).toBe('fakeToken');
  });
});
