import React from 'react';
import { shallow } from 'enzyme';
import { Item } from './item';

const defaultProps = {
  item: {
    column: { name: 'a', title: 'A' },
    hidden: false,
  },
};

describe('Item', () => {
  it('should set item checkbox value depending on the "hidden" property', () => {
    const tree = shallow((
      <Item
        {...defaultProps}
      />
    ));

    expect(tree.find('input[type="checkbox"]').prop('checked'))
      .toBe(true);

    tree.setProps({ item: { column: { name: 'a', title: 'A' }, hidden: true } });

    expect(tree.find('input[type="checkbox"]').prop('checked'))
      .toBe(false);
  });

  it('should call the "onToggle" on the checkbox "onChange" event', () => {
    const toggleHandler = jest.fn();
    const tree = shallow((
      <Item
        {...defaultProps}
        onToggle={toggleHandler}
      />
    ));

    tree.find('input[type="checkbox"]')
      .first()
      .prop('onChange')('a');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
  });

  it('should call the "onToggle" on the list item "onClick" event', () => {
    const toggleHandler = jest.fn();
    const tree = shallow((
      <Item
        {...defaultProps}
        onToggle={toggleHandler}
      />
    ));

    tree.find('button')
      .first()
      .prop('onClick')('a');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
  });

  it('should render column title or name in each item', () => {
    const tree = shallow((
      <Item
        {...defaultProps}
      />
    ));

    expect(tree.find('button').text().trim())
      .toBe('A');

    tree.setProps({ item: { column: { name: 'b' } } });

    expect(tree.find('button').text().trim())
      .toBe('b');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Item
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.list-group-item'))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Item
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should apply custom styles', () => {
    const tree = shallow((
      <Item
        {...defaultProps}
        style={{ color: 'red' }}
      />
    ));

    expect(tree.find('button').prop('style'))
      .toMatchObject({
        color: 'red',
      });
  });
});
