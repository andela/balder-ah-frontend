import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import BigArticleCard from './BigArticleCard';

afterEach(cleanup);

describe('<BigArticleCard />', () => {
  test('should render correctly', () => {
    const { container } = render(<BigArticleCard />);
    expect(container).toMatchSnapshot();
  });
});
