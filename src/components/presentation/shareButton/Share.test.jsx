import React from 'react';
import { render } from 'react-testing-library';
import Share from './Share';

const props = {
  articleSlug: 'ogbuke-kosilowo-345542',
  articleTitle: 'Kiging to the core',
};

describe('Share component test', () => {
  const shareComponent = render(<Share {...props} />);
  test('should fire event', async () => {
    const { container } = shareComponent;
    const shareButton = container.querySelector('i.material-icons');
    expect(shareButton).toBeInTheDocument();
  });
});
