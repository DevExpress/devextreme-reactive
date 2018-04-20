import { shallow } from '@vue/test-utils';
import { GroupPanelEmptyMessage } from './group-panel-empty-message';

describe('GroupPanelEmptyMessage', () => {
  it('should render empty message', () => {
    const tree = shallow({
      render() {
        return (
          <GroupPanelEmptyMessage
            getMessage={() => 'Empty'}
          />
        );
      },
    });

    expect(tree.text())
      .toBe('Empty');
  });
});
