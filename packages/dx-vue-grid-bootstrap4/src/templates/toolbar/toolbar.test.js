import { shallow } from '@vue/test-utils';
import { DxToolbar } from './toolbar';

describe('DxToolbar', () => {
  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <DxToolbar>
            <div class="content" />
          </DxToolbar>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
