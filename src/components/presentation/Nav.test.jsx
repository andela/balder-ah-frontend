import React from 'react';
import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { renderWithRouter } from '../../__mocks__/helpers';
import Nav from './Nav';

afterEach(cleanup);

describe('<Nav />', () => {
  test('should render correctly', () => {
    const { container } = renderWithRouter(<Nav />);
    expect(container).toMatchSnapshot();
  });
});
