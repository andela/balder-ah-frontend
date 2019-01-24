import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import EditProfileModal from './EditProfileModal';
import reducers from '../../reducers';

afterEach(cleanup);

describe('<EditProfileModal />', () => {
  const props = {
    username: 'kizito',
    bio: 'just chilling',
    email: 'kia@kis.com',
    image: 'https://someawesomephoto.jpg',
    toggleModal: true,
    onToggleModal: jest.fn(),
    updateProfile: jest.fn(),
  };

  const store = createStore(reducers, (applyMiddleware(thunk)));
  const connectedComponent = <Provider store={store}><EditProfileModal {...props} /></Provider>;

  test('should render correctly', () => {
    const { getByText } = render(connectedComponent);
    expect(getByText('Edit Your Profile')).toBeInTheDocument();
  });

  test('should handle form inputs correctly', () => {
    const { getByLabelText, getByText } = render(connectedComponent);

    fireEvent.change(getByLabelText('Username'), { target: { value: 'kayman' } });
    expect(getByLabelText('Username').value).toBe('kayman');

    const bio = getByLabelText('Bio');
    fireEvent.change(bio, { target: { value: 'I can dance' } });
    fireEvent.click(getByText(/update profile/i));
    expect(bio.value).toBe('I can dance');
  });
});
