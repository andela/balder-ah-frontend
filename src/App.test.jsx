import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import App from './App';
import { renderWithRedux } from './__mocks__/helpers';
import axios from './utils/axiosInstance';

const axiosMock = new MockAdapter(axios, { delayResponse: 500 });

describe('<App />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it renders homepage', async () => {
    axiosMock.onGet().reply(200);
    renderWithRedux(<App />);
  });
});
