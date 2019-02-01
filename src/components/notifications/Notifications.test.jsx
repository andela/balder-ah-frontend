import React from 'react';
import { cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import Notifications from './Notifications';
import renderWithRouter from '../../__mocks__/helpers';
import reducers from '../../reducers';

describe('Get Notifications', () => {
  afterEach(cleanup);

  const props = {
    notifications: ['Marcus just followed you'],
  };

  const store = createStore(reducers, (applyMiddleware(thunk)));
  const connectedComponent = <Provider store={store}><Notifications {...props} /></Provider>;

  test('should render correctly', () => {
    renderWithRouter(connectedComponent);
    expect(props.notifications).toEqual(['Marcus just followed you']);
  });
});
