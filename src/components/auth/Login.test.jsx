import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import Login from './Login';
import axiosInstance from '../../utils/axiosInstance';
import authUtils from '../../utils/auth';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));
const history = createMemoryHistory({ initialEntries: ['/', '/login'] });
history.push = jest.fn();

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
    const ui = <MemoryRouter><Login history={history} /></MemoryRouter>;
    LoginComponent = renderWithRedux(ui, store);

    emailField = LoginComponent.getByLabelText('Email');
    passwordField = LoginComponent.getByLabelText('Password');
    submitButton = LoginComponent.container.querySelector('button[type=submit]');
  });
  afterEach(axiosMock.restore);
  afterAll(history.push.mockRestore);
  test('it renders form all inputs', () => {
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

    expect(submitButton.textContent).toBe('Login');
  });

  test('fill and submit form with success', async () => {
    await axiosMock.onPost().replyOnce(200, { token: 'fakeToken' });

    fillSubmitForm(emailField, passwordField, submitButton);

    await wait(() => expect(authUtils.getUserToken()).toBe('fakeToken'));

    expect(authUtils.getUserToken()).toBe('fakeToken');
    expect(history.push).toHaveBeenCalledTimes(1);
  });

  test('fill and submit form with error', async () => {
    const { getByText } = LoginComponent;

    await axiosMock.onPost().replyOnce(402, { message: 'Invalid login credentials' });
    // fill login form
    fillSubmitForm(emailField, passwordField, submitButton);
    await wait(() => expect(getByText('Invalid login credentials')));
    expect(getByText('Invalid login credentials')).toBeInTheDocument();
  });
});
