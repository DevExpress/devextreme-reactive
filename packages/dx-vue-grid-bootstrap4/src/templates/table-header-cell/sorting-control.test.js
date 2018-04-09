import { shallow } from '@vue/test-utils';
import { SortingControl } from './sorting-control';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

describe('SortingControl', () => {
  it('can get focus', () => {
    const tree = shallow({
      render() {
        return (
          <SortingControl />
        );
      },
    });

    expect(tree.find('span').attributes().tabindex)
      .toBe('0');
  });

  it('can\'t get focus when disabled', () => {
    const tree = shallow({
      render() {
        return (
          <SortingControl disabled />
        );
      },
    });

    expect(tree.find('span').attributes().tabindex)
      .toBe('-1');
  });

  it('should handle click', () => {
    const onChange = jest.fn();
    const tree = shallow({
      render() {
        return (
          <SortingControl onChange={onChange} />
        );
      },
    });

    tree.find('span').trigger('click');
    expect(onChange)
      .toHaveBeenCalled();

    onChange.mockReset();
    tree.find('span').trigger('click', { metaKey: true });
    expect(onChange)
      .toHaveBeenCalledWith({ direction: null, keepOther: true });

    onChange.mockReset();
    tree.find('span').trigger('click', { ctrlKey: true });
    expect(onChange)
      .toHaveBeenCalledWith({ direction: null, keepOther: true });

    onChange.mockReset();
    tree.find('span').trigger('click', { ctrlKey: true });
    expect(onChange)
      .toHaveBeenCalledWith({ direction: null, keepOther: true });
  });

  it('should not handle click when disabled', () => {
    const onChange = jest.fn();
    const tree = shallow({
      render() {
        return (
          <SortingControl onChange={onChange} disabled />
        );
      },
    });

    tree.find('span').trigger('click');
    expect(onChange)
      .not.toHaveBeenCalled();
  });

  it('should handle the "Enter" and "Space" keys down', () => {
    const onChange = jest.fn();
    const tree = shallow({
      render() {
        return (
          <SortingControl onChange={onChange} />
        );
      },
    });

    tree.find('span').trigger('keydown', { keyCode: ENTER_KEY_CODE });
    expect(onChange)
      .toHaveBeenCalled();

    onChange.mockReset();
    tree.find('span').trigger('keydown', { keyCode: SPACE_KEY_CODE });
    expect(onChange)
      .toHaveBeenCalled();
  });

  it('should not handle the "Enter" and "Space" keys down when disabled', () => {
    const onChange = jest.fn();
    const tree = shallow({
      render() {
        return (
          <SortingControl onChange={onChange} disabled />
        );
      },
    });

    tree.find('span').trigger('keydown', { keyCode: ENTER_KEY_CODE });
    expect(onChange)
      .not.toHaveBeenCalled();

    onChange.mockReset();
    tree.find('span').trigger('keydown', { keyCode: SPACE_KEY_CODE });
    expect(onChange)
      .not.toHaveBeenCalled();
  });
});
