import React from 'react';
import { Router } from 'react-router-dom';
import { fireEvent, wait } from 'react-testing-library';
import { createMemoryHistory } from 'history';
import MockAdapter from 'axios-mock-adapter';
import Login from './Login';
import axiosInstance from '../../utils/axiosInstance';
import authUtils from '../../utils/auth';
import { renderWithRedux } from '../../__mocks__/helpers';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const history = createMemoryHistory({ initialEntries: ['/login'] });
history.push = jest.fn();

const fillForm = (arr) => {
  arr.forEach(value => fireEvent.change(value[0], { target: { value: value[1] } }));
};

const submitForm = submitButton => fireEvent.submit(submitButton);

describe('LoginForm', () => {
  let emailField;
  let passwordField;
  let submitButton;
  let LoginComponent;

  beforeEach(() => {
    const ui = (
      <Router history={history}>
        <Login />
      </Router>
    );
    LoginComponent = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: false } } });

    emailField = LoginComponent.getByLabelText('Email');
    passwordField = LoginComponent.getByLabelText('Password');
    submitButton = LoginComponent.container.querySelector('button[type=submit]');
  });

  afterEach(axiosMock.reset);
  afterAll(() => {
    history.push.mockRestore();
    axiosMock.restore();
  });

  test('it renders form all inputs', () => {
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();

    expect(submitButton.textContent).toBe('Login');
  });

  test('fill and submit form with success', async () => {
    axiosMock.onPost().replyOnce(200, { token: 'fakeToken' });

    fillForm([[emailField, 'johnwick@mail.com'], [passwordField, 'johnwick']]);
    submitForm(submitButton);
    await wait(() => expect(authUtils.getUserToken()).toBe('fakeToken'));
    expect(authUtils.getUserToken()).toBe('fakeToken');
  });

  test('should validate inputs before submitting form', async () => {
    const { getByText } = LoginComponent;
    fillForm([[emailField, 'abc@m'], [passwordField, '']]);
    submitForm(submitButton);

    expect(getByText(/invalid email address/i)).toBeInTheDocument();
    expect(getByText(/This field is required/i)).toBeInTheDocument();
  });

  test('fill and submit form with error', async () => {
    const { getByText } = LoginComponent;

    axiosMock.onPost().replyOnce(402, { message: 'Invalid login credentials' });

    fillForm([[emailField, 'novalid@mail.com'], [passwordField, 'sdadjflksdfj']]);
    submitForm(submitButton);

    await wait(() => expect(getByText('Invalid login credentials')));
    expect(getByText('Invalid login credentials')).toBeInTheDocument();
  });
});
