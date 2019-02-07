import React from 'react';
import { render } from 'react-testing-library';
import EditCommentForm from './EditCommentForm';

test('it renders with passed props', () => {
  const { getByText } = render(<EditCommentForm />);
  expect(getByText(/save changes/i)).toBeInTheDocument();
  expect(getByText(/cancel/i)).toBeInTheDocument();
});
