import { shallow } from '@vue/test-utils';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  it('should render $slots.default if passed', () => {
    const tree = shallow({
      render() {
        return (
          <EditCell>
            <span class="test" />
          </EditCell>
        );
      },
    });

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should render readonly editor if editing is not allowed', () => {
    const tree = shallow({
      render() {
        return (
          <EditCell
            editingEnabled={false}
          />
        );
      },
    });

    expect(tree.find('input').attributes().readonly)
      .toBeTruthy();
  });
});
