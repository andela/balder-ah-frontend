import React from 'react';
import { render } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import Homepage from '../components/Homepage';

describe('<Homepage />', () => {
  test('Homepage component should render a welcome text', () => {
    const { getByText } = render(<Homepage />);
    expect(getByText('This is Authors Haven Homepage')).toBeInTheDocument();
  });
});
