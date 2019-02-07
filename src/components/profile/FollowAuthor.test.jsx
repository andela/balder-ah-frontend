import React from 'react';
import { fireEvent, waitForDomChange } from 'react-testing-library';
import MockAdapter from 'axios-mock-adapter';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FollowAuthor from './FollowAuthor';
import axiosInstance from '../../utils/axiosInstance';
import { renderWithRedux } from '../../__mocks__/helpers';

const history = createMemoryHistory({ initialEntries: ['/profiles/Kizito'] });

const axiosMock = new MockAdapter(axiosInstance, { delayResponse: 500 });

describe('<FollowAuthor/>', () => {
  let FollowComponent;
  const match = {
    params: {
      username: 'Kizito',
    },
  };
  beforeEach(() => {
    axiosMock
      .onGet()
      .replyOnce(200, {
        userProfile: {
          username: 'Kizito',
          authorRating: 4.4,
          email: 'kizito@akhilo.me',
          image: 'https://kizito.jpg',
          bio: 'I am testing this thing',
          followers: {},
          isFollowing: null,
        },
      })
      .onGet()
      .replyOnce(200, {
        isFollowing: true,
        followerCount: 1,
        follower: [
          {
            id: 105,
            email: 'johnsonojo89@gmail.com',
            username: 'Johnson',
          },
        ],
      });
  });

  afterEach(axiosMock.reset);
  afterAll(axiosMock.restore);

  test('it should render correctly with follow button', async () => {
    const ui = (
      <Router history={history}>
        <FollowAuthor match={match} />
      </Router>
    );

    FollowComponent = renderWithRedux(ui);
    const { container, getByText } = FollowComponent;
    await waitForDomChange({ container });
    await waitForDomChange({ container });

    const followBtn = container.querySelector('button.btn');
    expect(getByText(/unfollow/i)).toBeInTheDocument();
    fireEvent.click(followBtn);
    axiosMock.onPost().replyOnce(200, { message: 'You have Unfollowed Kizito' });
    await waitForDomChange({ container });
    expect(getByText(/follow/i)).toBeInTheDocument();
    fireEvent.click(followBtn);
  });
});
