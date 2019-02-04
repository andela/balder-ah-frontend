import React from 'react';
import LatestArticles from './LatestArticles';
import renderWithRouter, { articles } from '../../__mocks__/helpers';

describe('<LatestArticles />', () => {
  const { allArticles: articlesMock } = { ...articles };
  const getUI = () => (
    <LatestArticles articles={articlesMock} />
  );
  test('it renders properly', () => {
    const { getByText } = renderWithRouter(getUI());
    expect(getByText(/other article/)).toBeInTheDocument();
  });

  test('it renders with default image', () => {
    articlesMock[0].imgUrl = '';
    const { container } = renderWithRouter(getUI());
    const imgSrc = container.querySelector('img').getAttribute('src');
    expect(imgSrc).not.toEqual('https://img.io');
  });
});
