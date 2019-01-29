import React from 'react';
import { renderWithRedux } from '../__mocks__/helpers';
import Index from '../components/Index';

describe('<Index />', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithRedux(<Index />);
    expect(getByText('Welcome to Authors Haven by Team Balder!')).toBeInTheDocument();
  });
});
