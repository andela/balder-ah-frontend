import React from 'react';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

import ProfileCard from './ProfileCard';

afterEach(cleanup);

describe('<ProfileCard />', () => {
  const props = {
    username: 'kizito',
    bio: 'I am a man?',
    image: 'https://fineimage.png',
    rating: 4.7,
    buttonText: 'edit',
    buttonCallback: jest.fn(),
  };

  test('should render correctly', () => {
    const { getByText } = render(<ProfileCard {...props} />);
    expect(getByText('kizito')).toBeInTheDocument();
    expect(getByText('I am a man?')).toBeInTheDocument();
  });
});
