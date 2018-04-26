import { shallow } from '@vue/test-utils';
import { EditCell } from './table-edit-cell';

describe('EditCell', () => {
  it('should render children if passed', () => {
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

  it('should pass class to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <EditCell
            class="custom-class"
          />
        );
      },
    });

    expect(tree.is('.align-middle.custom-class.dx-g-bs4-table-edit-cell'))
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
