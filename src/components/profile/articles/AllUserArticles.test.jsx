import React from 'react';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import { MemoryRouter } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';

import axios from '../../../utils/axiosInstance';
import AllUserArticles from './AllUserArticles';
import { renderWithRedux } from '../../../__mocks__/helpers';

const axiosMock = new MockAdapter(axios);

const payload = {
  currentUser: {
    articles: [
      {
        slug: 'I-can-dance-for-Africa-1548227765836',
        title: 'I can dance for Africa',
        description: "The dance that I can dance en! It's legendary!\n\nTh",
        imgUrl:
          'https://res.cloudinary.com/akhilome/image/upload/v1548227765/nwiei6vk4snvvstlepkp.jpg',
      },
    ],
  },
};

describe('<AllUserArticles />', () => {
  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);
  const wrappedComponent = <MemoryRouter><AllUserArticles /></MemoryRouter>;
  test('should render correctly', async () => {
    axiosMock.onGet().replyOnce(200, payload);
    const { getByText, container } = renderWithRedux(wrappedComponent);

    await waitForDomChange({ container });
    expect(getByText(/Published Articles/i)).toBeInTheDocument();
  });

  test('should successfully delete an article', async () => {
    axiosMock.onGet().replyOnce(200, payload);
    axiosMock.onDelete().replyOnce(200, { status: 'Success', message: 'Article deleted successfully' });
    const { getByText, container } = renderWithRedux(wrappedComponent);

    await waitForDomChange({ container });

    fireEvent.click(getByText(/Delete/i));
    expect(getByText(/Are you sure?/i)).toBeInTheDocument();
    fireEvent.click(getByText(/delete it/i));

    await waitForDomChange({ container });
    expect(getByText(/article deleted successfully/i)).toBeInTheDocument();
  });
});
