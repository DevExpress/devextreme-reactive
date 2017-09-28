import React from 'react';
import { ListItem, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { mount } from 'enzyme';
import { ColumnChooserPanelItem } from './column-chooser-panel-item';

describe('ColumnChooserPanel', () => {
  it('should set item checkbox value depending on the "hidden" property', () => {
    const tree = mount(
      <ColumnChooserPanelItem
        column={{ name: 'a', title: 'A' }}
        hidden={false}
      />,
    );

    expect(tree.find(Checkbox).prop('checked'))
      .toBe(true);

    tree.setProps({ hidden: true });

    expect(tree.find(Checkbox).prop('checked'))
      .toBe(false);
  });

  it('should call the "onClick" on the list item "onClick" event', () => {
    const toggleHandler = jest.fn();
    const tree = mount(
      <ColumnChooserPanelItem
        column={{ name: 'a', title: 'A' }}
        hidden={false}
        onClick={toggleHandler}
      />,
    );

    tree.find(ListItem)
      .first()
      .prop('onClick')('a');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
    expect(toggleHandler)
      .toHaveBeenCalledWith('a');
  });

  it('should render column title or name in each item', () => {
    const tree = mount(
      <ColumnChooserPanelItem
        column={{ name: 'a', title: 'A' }}
        hidden={false}
      />,
    );

    expect(tree.find(ListItemText).text().trim())
      .toBe('A');

    tree.setProps({ column: { name: 'b' } });

    expect(tree.find(ListItemText).text().trim())
      .toBe('b');
  });
});
