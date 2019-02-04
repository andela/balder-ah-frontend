import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { waitForDomChange } from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import axios from '../utils/axiosInstance';
import Home from './Home';
import { renderWithRedux, articles as articlesMock } from '../__mocks__/helpers';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });
const history = createMemoryHistory({ initialEntries: ['/'] });
describe('<Home />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  const ui = (
    <Router history={history}>
      <Home />
    </Router>
  );

  test('it renders properly', async () => {
    axiosMock.onGet().replyOnce(200, articlesMock);
    const { getByText, container } = renderWithRedux(ui);
    await waitForDomChange({ container });

    expect(getByText(/other article/)).toBeInTheDocument();
  });
});
