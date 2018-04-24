import { shallow } from '@vue/test-utils';
import { ExpandButton } from './expand-button';

const defaultProps = {
  visible: true,
  expanded: false,
  onToggle: () => { },
};

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('ExpandButton', () => {
  it('should handle click', () => {
    const onToggle = jest.fn();
    const tree = shallow({
      render() {
        return (
          <ExpandButton
            {...defaultProps}
            onToggle={onToggle}
          />
        );
      },
    });

    tree.find('i').trigger('click', { stopPropagation: () => { } });
    expect(onToggle)
      .toHaveBeenCalled();
  });

  it('can get focus', () => {
    const tree = shallow({
      render() {
        return (
          <ExpandButton
            {...defaultProps}
          />
        );
      },
    });

    expect(tree.find('i').element.tabIndex)
      .toBe(0);
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onToggle = jest.fn();
    const tree = shallow({
      render() {
        return (
          <ExpandButton
            {...defaultProps}
            onToggle={onToggle}
          />
        );
      },
    });

    const targetElement = tree.find('i');
    targetElement.trigger('keydown', { keyCode: ENTER_KEY_CODE, preventDefault: () => { } });
    expect(onToggle)
      .toHaveBeenCalled();

    onToggle.mockClear();
    targetElement.trigger('keydown', { keyCode: SPACE_KEY_CODE, preventDefault: () => { } });
    expect(onToggle)
      .toHaveBeenCalled();

    onToggle.mockClear();
    targetElement.trigger('keydown', { keyCode: 51, preventDefault: () => { } });
    expect(onToggle)
      .not.toHaveBeenCalled();
  });

  describe('hidden', () => {
    it('should not handle click', () => {
      const onToggle = jest.fn();
      const tree = shallow({
        render() {
          return (
            <ExpandButton
              {...defaultProps}
              visible={false}
              onToggle={onToggle}
            />
          );
        },
      });

      tree.find('i').trigger('click', { stopPropagation: () => { } });
      expect(onToggle)
        .not.toHaveBeenCalled();
    });

    it('can not get focus', () => {
      const tree = shallow({
        render() {
          return (
            <ExpandButton
              {...defaultProps}
              visible={false}
            />
          );
        },
      });

      expect(tree.find('i').element.tabIndex)
        .toBe(-1);
    });
  });
});
