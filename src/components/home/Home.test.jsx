import React from 'react';
import { render } from 'react-testing-library';
import Home from './Home';

describe('<Homepage />', () => {
  test('Homepage component should render a welcome text', () => {
    const { getByText } = render(<Home />);
    expect(getByText(/Welcome to Author's Haven by Team Balder!/)).toBeInTheDocument();
  });
});
