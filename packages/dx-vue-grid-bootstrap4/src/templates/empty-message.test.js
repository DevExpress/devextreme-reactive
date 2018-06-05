import { shallow } from '@vue/test-utils';
import { EmptyMessage } from './empty-message';

describe('EmptyMessage', () => {
  it('should use "noColumns" message key', () => {
    const tree = shallow({
      render() {
        return (
          <EmptyMessage getMessage={key => key} />
        );
      },
    });

    expect(tree.find('div big.text-muted').text()).toBe('noColumns');
  });
});
