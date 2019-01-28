import React from 'react';
import { render } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';

import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
  test('should render correctly', () => {
    const { getByText, container } = render(<MemoryRouter><NotFoundPage /></MemoryRouter>);
    expect(getByText('Page Not Found')).toBeInTheDocument();
    expect(getByText('Go Back Home')).toBeInTheDocument();
    const url = container.querySelector('a').href;
    expect(url[url.length - 1]).toEqual('/');
  });
});
