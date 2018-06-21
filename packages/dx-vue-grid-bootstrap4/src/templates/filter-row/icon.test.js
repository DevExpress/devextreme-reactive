import { shallow } from '@vue/test-utils';
import { Icon } from './icon';

describe('Icon', () => {
  it('should render default icon if unknown type is specified', () => {
    const tree = shallow(({
      render() {
        return (
          <Icon />
        );
      },
    }));
    expect(tree.find('.oi-magnifying-glass').exists())
      .toBeTruthy();
  });
});
