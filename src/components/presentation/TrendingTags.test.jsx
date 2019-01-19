import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import TrendingTags from './TrendingTags';

afterEach(cleanup);

describe('<TrendingTags />', () => {
  test('should render correctly', () => {
    const { container } = render(<TrendingTags />);
    expect(container).toMatchSnapshot();
  });
});
