import * as React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { mount, shallow } from 'enzyme';
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

    expect(tree.find(Checkbox).prop('checked'))
      .toBe(true);

    tree.setProps({ item: { column: { name: 'a', title: 'A' }, hidden: true } });

    expect(tree.find(Checkbox).prop('checked'))
      .toBe(false);
  });

  it('should call the "onToggle" on the list item "onClick" event', () => {
    const toggleHandler = jest.fn();
    const tree = shallow((
      <Item
        onToggle={toggleHandler}
        {...defaultProps}
      />
    ));

    tree.find(ListItem)
      .first()
      .prop('onClick')('a');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
  });

  it('should render column title or name in each item', () => {
    const tree = mount((
      <Item
        {...defaultProps}
      />
    ));

    expect(tree.find(ListItemText).text().trim())
      .toBe('A');

    tree.setProps({ item: { column: { name: 'b' } } });

    expect(tree.find(ListItemText).text().trim())
      .toBe('b');
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
});
