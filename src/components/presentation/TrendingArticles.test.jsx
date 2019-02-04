import React from 'react';
import TrendingArticles from './TrendingArticles';
import renderWithRouter, { articles } from '../../__mocks__/helpers';


describe('<TrendingArticles /> ', () => {
  const { allArticles: articlesMock } = { ...articles };
  test('it renders properly', () => {
    const { getByText } = renderWithRouter(<TrendingArticles articles={articlesMock} />);
    expect(getByText(/something funny/)).toBeInTheDocument();
  });

  test('renders with default image', () => {
    articlesMock[0].imgUrl = '';
    const { container } = renderWithRouter(<TrendingArticles articles={articlesMock} />);
    expect(container.querySelector('img').getAttribute('src')).not.toEqual('https://img.io');

    articlesMock[1].imgUrl = '';
    renderWithRouter(<TrendingArticles articles={articlesMock} />);
  });
});
