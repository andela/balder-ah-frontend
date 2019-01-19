import React from 'react';
import { render } from 'react-testing-library';
import Homepage from '../components/Home';

describe('<Homepage />', () => {
  test('Homepage component should render a welcome text', () => {
    const { getByText } = render(<Homepage />);
    expect(getByText('Welcome to Author\'s Haven by Team Balder!')).toBeInTheDocument();
  });
});
