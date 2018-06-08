import { shallow } from '@vue/test-utils';
import { Overlay } from './overlay';

describe('Overlay', () => {
  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <Overlay
            target={{
              getBoundingClientRect: () => ({}),
            }}
          >
            <div class="content" />
          </Overlay>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
