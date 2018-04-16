import { shallow } from '@vue/test-utils';
import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <Toolbar>
            <div class="content" />
          </Toolbar>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
