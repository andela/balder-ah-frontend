import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { renderWithRedux } from '../../__mocks__/helpers';

const jsx = () => <div>protected!</div>;

describe('<PrivateRoute />', () => {
  test('should render loader upon mounting', () => {
    const { container } = renderWithRedux(<MemoryRouter><PrivateRoute /></MemoryRouter>);

    expect(container.querySelector('.fs-loader-container')).toBeInTheDocument();
  });

  test('should render protected component if user is logged in', () => {
    const { getByText } = renderWithRedux(
      <MemoryRouter>
        <PrivateRoute component={jsx} />
      </MemoryRouter>,
      { initialState: { auth: { isLoggedIn: true } } },
    );

    expect(getByText(/protected!/i)).toBeInTheDocument();
  });

  test('should not render protected component if user is logged in', () => {
    const { container } = renderWithRedux(
      <MemoryRouter>
        <PrivateRoute component={jsx} />
      </MemoryRouter>,
      { initialState: { auth: { isLoggedIn: false } } },
    );

    expect(container.querySelector('div')).not.toEqual('protected!');
  });
});
