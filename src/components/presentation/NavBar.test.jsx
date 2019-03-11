import React from 'react';
import { fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { renderWithRedux } from '../../__mocks__/helpers';

import NavBar from './NavBar';

const history = createMemoryHistory({ initialEntries: ['/notifications'] });

describe('<NavBar />', () => {
  const ui = (
    <Router history={history}>
      <NavBar />
    </Router>
  );

  test('should render correctly', () => {
    const { getByText } = renderWithRedux(ui);
    expect(getByText('Authors Haven')).toBeInTheDocument();
  });

  test('Render Notification components correctly', () => {
    const { container, getByText } = renderWithRedux(ui);
    const showNotifPage = container.querySelector('.center');
    const notifBar = container.querySelector('.display-none');
    const notifBell = container.querySelector('.notif-bell');
    const notifCount = container.querySelector('.notif-count');

    expect(getByText('View details')).toBeInTheDocument();
    expect(showNotifPage).toBeInTheDocument();
    expect(notifBar).toBeInTheDocument();
    expect(notifBell).toBeInTheDocument();
    expect(notifCount).toBeInTheDocument();
  });

  test('should fire events correctly', async () => {
    const { container, getByText } = renderWithRedux(
      ui,
      { initialState: { notifications: { newNotification: ['woops'] } } },
    );

    fireEvent.click(container.querySelector('.notif-count'));
    fireEvent.click(container.querySelector('.notif-count'));
    fireEvent.click(container.querySelector('.notif-count'));
    expect(getByText(/woops/i)).toBeInTheDocument();
    fireEvent.click(getByText(/view details/i));
  });
});
