import React from 'react';
import { fireEvent, wait } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import Signup from './Signup';
import axiosInstance from '../../utils/axiosInstance';
import auth from '../../utils/auth';
import { renderWithRedux } from '../../__mocks__/helpers';

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });

const fillSubmitForm = (
  usernameField,
  emailField,
  passwordField,
  confirmPasswordField,
  submitButton,
) => {
  fireEvent.change(usernameField, { target: { value: 'loremMaster' } });
  fireEvent.change(emailField, { target: { value: 'lorem@example.com' } });
  fireEvent.change(passwordField, { target: { value: 'loremSecret' } });
  fireEvent.change(confirmPasswordField, { target: { value: 'loremSecret' } });
  fireEvent.submit(submitButton);
};

describe('SignupForm', () => {
  let usernameField;
  let emailField;
  let passwordField;
  let confirmPasswordField;
  let submitButton;
  let SignupComponent;

  beforeEach(() => {
    const ui = (
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    SignupComponent = renderWithRedux(ui, { initialState: { auth: { isLoggedIn: false } } });
    usernameField = SignupComponent.getByLabelText('Username');
    emailField = SignupComponent.getByLabelText('Email');
    passwordField = SignupComponent.getByLabelText('Password');
    confirmPasswordField = SignupComponent.getByLabelText('Confirm Password');
    submitButton = SignupComponent.container.querySelector('button[type=submit]');
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it renders all form inputs', () => {
    expect(usernameField).toBeInTheDocument();
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(confirmPasswordField).toBeInTheDocument();

    expect(submitButton.textContent).toBe('Sign up');
  });

  test('fill and submit form with error', async () => {
    const { getByText } = SignupComponent;

    await axiosMock.onPost().replyOnce(400, { errors: { body: ['Invalid details'] } });
    // fill signup form
    fillSubmitForm(usernameField, emailField, passwordField, confirmPasswordField, submitButton);
    await wait(() => expect(getByText('Invalid details')));
    expect(getByText('Invalid details')).toBeInTheDocument();
  });

  test('fill and submit form with success', async () => {
    const { getByText } = SignupComponent;

    await axiosMock.onPost().replyOnce(200, { message: 'Welcome loremMaster', token: 'fakeToken' });
    // fill signup form
    fillSubmitForm(usernameField, emailField, passwordField, confirmPasswordField, submitButton);

    await wait(() => expect(getByText('Welcome loremMaster')));

    expect(getByText('Welcome loremMaster')).toBeInTheDocument();
    expect(auth.getUserToken()).toBe('fakeToken');
  });
});
