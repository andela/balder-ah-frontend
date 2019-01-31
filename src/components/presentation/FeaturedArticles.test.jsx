import React from 'react';
import FeaturedArticles from './FeaturedArticles';
import renderWithRouter, { articles } from '../../__mocks__/helpers';

describe('<FeaturedArticles />', () => {
  const { allArticles: articlesMock } = { ...articles };
  const getUI = () => (
    <FeaturedArticles articles={articlesMock} />
  );
  test('it renders properly', () => {
    const { getByText } = renderWithRouter(getUI());
    expect(getByText(/other article/)).toBeInTheDocument();
  });
});
