import React from 'react';
import { createMemoryHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { render, fireEvent } from 'react-testing-library';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import 'react-testing-library/cleanup-after-each';
import MockAdapter from 'axios-mock-adapter';
import 'jest-dom/extend-expect';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import { PasswordResetForm } from './PasswordReset';
import axiosInstance from '../../utils/axiosInstance';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });
const store = createStore(reducers, applyMiddleware(thunk));
const renderWithRedux = (ui, reduxStore) => ({
  ...render(<Provider store={reduxStore}>{ui}</Provider>),
  store,
});

const fillSubmitForm = (emailField, submitButton) => {
  fireEvent.change(emailField, { target: { value: 'emeka@gmail.com' } });
  fireEvent.submit(submitButton);
};
const history = createMemoryHistory({ initialEntries: ['/', '/login'] });
const props = {
  resetPassword: jest.fn(),
};
describe('UpdatePasswordForm', () => {
  let emailField;
  let submitButton;
  let ResetPasswordComponent;

  beforeEach(() => {
    const ui = <Router history={history}><PasswordResetForm {...props} /></Router>;
    ResetPasswordComponent = renderWithRedux(ui, store);
    emailField = ResetPasswordComponent.getByLabelText('Email');
    submitButton = ResetPasswordComponent.container.querySelector('button[type=submit]');
  });
  test('it renders all form inputs', () => {
    expect(emailField).toBeInTheDocument();
    expect(submitButton.textContent).toBe('Reset Password');
  });
  test('fill and submit form with success', async () => {
    await axiosMock
      .onPost()
      .replyOnce(200, { message: 'Check your mail to proceed.' });
    fillSubmitForm(emailField, submitButton);
    expect(props.resetPassword).toHaveBeenCalled();
  });
});
