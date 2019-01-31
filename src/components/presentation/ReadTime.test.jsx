import React from 'react';
import ReadTime from './ReadTime';

import { renderWithRedux } from '../../__mocks__/helpers';

describe('<ReadTime />', () => {
  test('it renders with appropriate prop', () => {
    const props = {
      article: {
        readtime: '2 mins',
      },
    };
    const { getByText } = renderWithRedux(<ReadTime {...props} />);
    expect(getByText('2 mins read')).toBeInTheDocument();
  });
});
