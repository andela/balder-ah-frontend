import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from 'react-testing-library';
import NavSearch from './NavSearch';

const history = createMemoryHistory({ initialEntries: ['/'] });
history.push = jest.fn();

describe('<NavSearch />', () => {
  const ui = (
    <Router history={history}>
      <NavSearch />
    </Router>
  );

  afterAll(history.push.mockRestore);

  test('enter search query and submit form', () => {
    const { container } = render(ui);
    const searchInput = container.querySelector('#nav-search-input');
    const form = container.querySelector('form.nav-search');
    const query = 'hello world';

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.submit(form);

    fireEvent.change(searchInput, { target: { value: query } });
    fireEvent.submit(form);

    expect(history.push).toHaveBeenCalledTimes(1);
    expect(history.push).toHaveBeenCalledWith(`/search?q=${query}`);
  });
});
