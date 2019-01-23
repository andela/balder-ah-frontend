import React from 'react';
import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import renderWithRouter from '../__mocks__/helpers';
import Index from '../components/Index';

afterEach(cleanup);

describe('<Index />', () => {
  test('should render correctly', () => {
    const { container } = renderWithRouter(<Index />);
    expect(container).toMatchSnapshot();
  });
});
