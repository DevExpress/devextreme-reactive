import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { mount } from 'enzyme';
import { ColumnChooserItem } from './column-chooser-item';

describe('ColumnChooserItem', () => {
  it('should set item checkbox value depending on the "hidden" property', () => {
    const tree = mount(
      <ColumnChooserItem
        item={{
          column: { name: 'a', title: 'A' },
          hidden: false,
        }}
      />,
    );

    expect(tree.find(Checkbox).prop('checked'))
      .toBe(true);

    tree.setProps({ item: { column: { name: 'a', title: 'A' }, hidden: true } });

    expect(tree.find(Checkbox).prop('checked'))
      .toBe(false);
  });

  it('should call the "onToggle" on the list item "onClick" event', () => {
    const toggleHandler = jest.fn();
    const tree = mount(
      <ColumnChooserItem
        item={{
          column: { name: 'a', title: 'A' },
          hidden: false,
        }}
        onToggle={toggleHandler}
      />,
    );

    tree.find(ListItem)
      .first()
      .prop('onClick')('a');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
  });

  it('should render column title or name in each item', () => {
    const tree = mount(
      <ColumnChooserItem
        item={{
          column: { name: 'a', title: 'A' },
          hidden: false,
        }}
      />,
    );

    expect(tree.find(ListItemText).text().trim())
      .toBe('A');

    tree.setProps({ item: { column: { name: 'b' } } });

    expect(tree.find(ListItemText).text().trim())
      .toBe('b');
  });
});
