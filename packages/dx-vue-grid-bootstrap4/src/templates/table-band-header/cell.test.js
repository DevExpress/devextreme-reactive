import { shallow } from '@vue/test-utils';
import { Cell } from './cell';

describe('TableCell', () => {
  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <Cell>
            <div class="content" />
          </Cell>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
