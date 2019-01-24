import React from 'react';
import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderWithRouter from '../../__mocks__/helpers';

import NavBar from './NavBar';

afterEach(cleanup);


describe('<NavBar />', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithRouter(<NavBar />);
    expect(getByText('Authors Haven')).toBeInTheDocument();
  });
});
