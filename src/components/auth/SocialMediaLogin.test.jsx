import React from 'react';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import { render, cleanup } from 'react-testing-library';
import SocialAuthButton from './SocialAuthButton';
import { SocialMediaLogin } from './SocialMediaLogin';
import reducers from '../../reducers/auth';

afterEach(cleanup);

const { SOCIAL_AUTH_TEST_TOKEN } = process.env;
const props = {
  location: {
    search: `?token=${SOCIAL_AUTH_TEST_TOKEN}`,
  },
  history: {
    push: jest.fn(),
  },
  socialAuth: jest.fn(),
  socialAuthentication: jest.fn(),
};
describe('Social auth buthon', () => {
  test('contain name twitter', () => {
    const { getByText } = render(<SocialAuthButton />);
    expect(getByText('twitter')).toBeInTheDocument();
  });
  test('contain name facebook', () => {
    const { getByText } = render(<SocialAuthButton />);
    expect(getByText('facebook')).toBeInTheDocument();
  });
  test('contain name google', () => {
    const { getByText } = render(<SocialAuthButton />);
    expect(getByText('google')).toBeInTheDocument();
  });
  test('if the component rendered', () => {
    const component = render(<SocialMediaLogin {...props} />);
    expect(component).toBeTruthy();
  });
  test('reducers', () => {
    const socialAuthReducer = reducers({}, { type: 'SOCIAL_AUTH' });
    expect(socialAuthReducer).toMatchObject({ isLoggedIn: true });
  });
});
