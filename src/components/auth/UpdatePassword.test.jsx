import React from 'react';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent, wait } from 'react-testing-library';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import UpdatePassword from './UpdatePassword';
import axiosInstance from '../../utils/axiosInstance';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));
const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});
const history = createMemoryHistory({ initialEntries: ['/', '/login'] });
history.push = jest.fn();

const fillSubmitForm = (
  passwordField,
  confirmPasswordField, submitButton,
) => {
  fireEvent.change(passwordField, { target: { value: 'Secret12' } });
  fireEvent.change(confirmPasswordField, { target: { value: 'Secret12' } });
  fireEvent.submit(submitButton);
};

const fillSubmitFormWithError = (
  passwordField,
  confirmPasswordField, submitButton,
) => {
  fireEvent.change(passwordField, { target: { value: 'Secret123' } });
  fireEvent.change(confirmPasswordField, { target: { value: 'Secret12' } });
  fireEvent.submit(submitButton);
};

const fillSubmitFormWithError1 = (
  passwordField,
  confirmPasswordField,
) => {
  fireEvent.change(passwordField, { target: { value: 'Secret12' } });
  fireEvent.keyUp(confirmPasswordField, { key: 'A', code: 65, charCode: 65 });
};

const fillSubmitFormWithError2 = (
  passwordField,
  confirmPasswordField, submitButton,
) => {
  fireEvent.change(passwordField, { target: { value: '' } });
  fireEvent.change(confirmPasswordField, { target: { value: '' } });
  fireEvent.submit(submitButton);
};

const { SOCIAL_AUTH_TEST_TOKEN } = process.env;
const props = {
  location: {
    search: `?token=${SOCIAL_AUTH_TEST_TOKEN}`,
  },
  PasswordResetForm: jest.fn(),
};

describe('UpdatePasswordForm', () => {
  let passwordField;
  let confirmPasswordField;
  let submitButton;
  let UpdatePasswordComponent;

  beforeEach(() => {
    const ui = <Router history={history}><UpdatePassword {...props} history={history} /></Router>;
    UpdatePasswordComponent = renderWithRedux(ui, store);
    passwordField = UpdatePasswordComponent.getByLabelText('New password');
    confirmPasswordField = UpdatePasswordComponent.getByLabelText('Confirm password');
    submitButton = UpdatePasswordComponent.container.querySelector('button[type=submit]');
  });
  test('it renders all form inputs', () => {
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();

    expect(submitButton.textContent).toBe('Update Password');
  });

  test('fill and submit form with success', async () => {
    await axiosMock
      .onPost()
      .replyOnce(200, { message: 'Password updated successfully' });

    fillSubmitForm(passwordField, confirmPasswordField, submitButton);
    await wait(() => expect(history.push).toHaveBeenCalledTimes(1));
    expect(history.push).toHaveBeenCalledTimes(1);
  });
  test('fill and submit form with error', async () => {
    const { getByText } = UpdatePasswordComponent;
    await axiosMock
      .onPost()
      .replyOnce(400, { message: { body: ['The passwords must be 8 characters'] } });

    fillSubmitFormWithError(passwordField, confirmPasswordField, submitButton);
    await wait(() => expect(getByText('The passwords must be 8 characters')));
    expect(getByText('The passwords must be 8 characters')).toBeInTheDocument();
  });
  test('fill and submit form with error', async () => {
    const { getByText } = UpdatePasswordComponent;
    await axiosMock
      .onPost()
      .replyOnce(400, { message: { body: ['The passwords do not match'] } });

    fillSubmitFormWithError1(passwordField, confirmPasswordField, submitButton);
    await wait(() => expect(getByText('The passwords do not match')));
    expect(getByText('The passwords do not match')).toBeInTheDocument();
  });
  test('fill and submit form with error', async () => {
    const { getByText } = UpdatePasswordComponent;
    await axiosMock
      .onPost()
      .replyOnce(400, { message: { body: ['Password fields can not be empty'] } });

    fillSubmitFormWithError2(passwordField, confirmPasswordField, submitButton);
    await wait(() => expect(getByText('Password fields can not be empty')));
    expect(getByText('Password fields can not be empty')).toBeInTheDocument();
  });
});
