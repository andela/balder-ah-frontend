import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import Footer from './Footer';

afterEach(cleanup);

describe('<Footer />', () => {
  test('should render correctly', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
