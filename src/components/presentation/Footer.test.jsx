import React from 'react';
import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderWithRouter from '../../__mocks__/helpers';

import Footer from './Footer';

afterEach(cleanup);

describe('<Footer />', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithRouter(<Footer />);
    expect(getByText('About')).toBeInTheDocument();
    expect(getByText('Contact')).toBeInTheDocument();
    expect(getByText('Terms of use')).toBeInTheDocument();
    expect(getByText('Privacy Policy')).toBeInTheDocument();
  });
});
