import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import SmallArticleCard from './SmallArticleCard';

afterEach(cleanup);

describe('<SmallArticleCard />', () => {
  test('should render correctly', () => {
    const { container } = render(<SmallArticleCard />);
    expect(container).toMatchSnapshot();
  });
});
