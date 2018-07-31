import { shallow } from '@vue/test-utils';
import { GroupPanelContainer } from './group-panel-container';

describe('GroupPanelContainer', () => {
  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <GroupPanelContainer>
            <div class="content" />
          </GroupPanelContainer>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });
});
