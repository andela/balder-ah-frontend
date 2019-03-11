import React from 'react';
import { fireEvent, cleanup, getByText } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { Profile } from './Profile';
import renderWithRouter from '../../__mocks__/helpers';
import reducers from '../../reducers';

describe('<Profile />', () => {
  afterEach(cleanup);

  const props = {
    getProfile: jest.fn(),
    username: 'Kizito',
    rating: 4.4,
    email: 'kizito@akhilo.me',
    image: 'https://kizito.jpg',
    bio: 'I am testing this thing',
  };

  const store = createStore(reducers, applyMiddleware(thunk));
  const connectedComponent = (
    <Provider store={store}>
      <Profile {...props} />
    </Provider>
  );

  test('should render correctly', () => {
    renderWithRouter(connectedComponent);
    expect(props.getProfile).toHaveBeenCalled();
  });

  test('should bring up modal on edit button click', () => {
    const spy = jest.spyOn(Profile.prototype, 'onEditProfile');
    const { container } = renderWithRouter(connectedComponent);
    fireEvent.click(getByText(container, 'edit'));
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
