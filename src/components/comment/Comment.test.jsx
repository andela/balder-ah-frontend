import React from 'react';
import { renderWithRedux } from '../../__mocks__/helpers';
import Comment from './Comment';

describe('<Comment />', () => {
  const prop = {
    comment: {
      body: 'This is the comment body',
      author: { username: 'johndoe', image: 'avatar.png' },
      createdAt: '2019-01-23T23:21:33.874Z',
    },
  };

  test('it renders properyly', () => {
    const { getByText } = renderWithRedux(<Comment {...prop} />);
    expect(getByText(prop.comment.author.username)).toBeInTheDocument();
    expect(getByText(prop.comment.body)).toBeInTheDocument();
    expect(getByText((new Date(prop.comment.createdAt)).toDateString())).toBeInTheDocument();
  });

  test('should render with default user avatar', () => {
    delete prop.comment.author.image;
    const { container } = renderWithRedux(<Comment {...prop} />);
    expect(container.querySelector('img').getAttribute('src')).toEqual('anonymous.png');
  });
});
