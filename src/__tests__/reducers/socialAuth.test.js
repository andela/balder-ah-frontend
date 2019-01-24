import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect';
import socialAction from '../../actions/socialAuth';

describe('Action', () => {
  test('social auth action', () => {
    const socialAuthAction = socialAction('qwee32425q237#$.78dasaft667890ghtresdw42ewsdfgrt');
    expect(socialAuthAction).toMatchObject({ type: 'SOCIAL_AUTH' });
  });
});
