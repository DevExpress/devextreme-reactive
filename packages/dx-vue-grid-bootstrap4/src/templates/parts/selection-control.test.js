import { shallow, mount } from '@vue/test-utils';
import { SelectionControl } from './selection-control';

describe('SelectionControl', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <SelectionControl
            class="custom-class"
          />
        );
      },
    });

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should render indeterminate state checkbox if the `indeterminate` property is true', () => {
    const tree = mount({
      render() {
        return (
          <SelectionControl
            indeterminate
          />
        );
      },
    });

    expect(tree.find('input').element.indeterminate)
      .toBeTruthy();
  });

  it('should not fire the `onChange` event on cell click if selection is not available', () => {
    const onChange = jest.fn();
    const tree = shallow({
      render() {
        return (
          <SelectionControl
          disabled
          onChange={onChange}
          />
        );
      },
    });
    tree.find('input').trigger('change');

    expect(onChange).not.toHaveBeenCalled();
  });
});
