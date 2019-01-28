import React from 'react';
import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import { renderWithRedux } from '../__mocks__/helpers';
import Index from '../components/Index';
import App from '../App';

afterEach(cleanup);

describe('<Index />', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithRedux(<Index />);
    expect(getByText("Welcome to Author's Haven by Team Balder!")).toBeInTheDocument();
  });
});

describe('<App />', () => {
  test('should render correctly', () => {
    const { getByText } = renderWithRedux(<App />);
    expect(getByText("Welcome to Author's Haven by Team Balder!")).toBeInTheDocument();
  });
});
