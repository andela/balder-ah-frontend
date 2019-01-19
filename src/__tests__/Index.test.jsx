import React from 'react';
import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import renderWithRouter from '../__mocks__/helpers';
import Index from '../components/Index';
import App from '../App';

afterEach(cleanup);

describe('<Index />', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithRouter(<Index />);
    expect(getByText("Welcome to Author's Haven by Team Balder!")).toBeInTheDocument();
  });
});

describe('<App />', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText("Welcome to Author's Haven by Team Balder!")).toBeInTheDocument();
  });
});
