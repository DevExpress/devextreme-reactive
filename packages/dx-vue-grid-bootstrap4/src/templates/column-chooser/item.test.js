import { shallow } from '@vue/test-utils';
import { Item } from './item';

const defaultProps = {
  item: {
    column: { name: 'a', title: 'A' },
    hidden: false,
  },
};

describe('Item', () => {
  it('should mark checkbox as checked if "hidden" property is false', () => {
    const tree = shallow({
      render() {
        return (
          <Item
            {...{ attrs: { ...defaultProps } }}
            onToggle={() => {}}
          />
        );
      },
    });
    expect(tree.find('input[type="checkbox"]').element.checked)
      .toBe(true);
  });

  it('shouldn\'t mark checkbox as checked if "hidden" property is true', () => {
    const tree = shallow({
      render() {
        return (
          <Item
            item={{
              column: { name: 'a', title: 'A' },
              hidden: true,
            }}
            onToggle={() => {}}
          />
        );
      },
    });
    expect(tree.find('input[type="checkbox"]').element.checked)
      .toBe(false);
  });

  it('should call the "onToggle" on the checkbox "onChange" event', () => {
    const toggleHandler = jest.fn();
    const tree = shallow({
      render() {
        return (
          <Item
            {...{ attrs: { ...defaultProps } }}
            onToggle={toggleHandler}
          />
        );
      },
    });

    tree.find('input[type="checkbox"]').trigger('change');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
  });

  it('should call the "onToggle" on the list item "onClick" event', () => {
    const toggleHandler = jest.fn();
    const tree = shallow({
      render() {
        return (
          <Item
            onToggle={toggleHandler}
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    tree.find('input[type="checkbox"]').trigger('click');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
  });

  it('should render column title in each item', () => {
    const tree = shallow({
      render() {
        return (
          <Item
            {...{ attrs: { ...defaultProps } }}
            onToggle={() => {}}
          />
        );
      },
    });

    expect(tree.find('button').text().trim())
      .toBe('A');
  });

  it('should render column name in each item if title is not defined', () => {
    const tree = shallow({
      render() {
        return (
          <Item
            item={{ column: { name: 'b' } }}
            onToggle={() => {}}
          />
        );
      },
    });

    expect(tree.find('button').text().trim())
      .toBe('b');
  });

  it('should process the disabled prop', () => {
    const tree = shallow({
      render() {
        return (
          <Item
            item={{ column: { name: 'b' } }}
            onToggle={() => {}}
            disabled
          />
        );
      },
    });
    expect(tree.find('button').element.disabled)
      .toBeTruthy();
    expect(tree.find('input[type="checkbox"]').element.disabled)
      .toBeTruthy();
  });
});
