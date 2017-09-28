import React from 'react';
import { mount } from 'enzyme';
import { ColumnChooserPanelItem } from './column-chooser-panel-item';

describe('ColumnChooserPanelItem', () => {
  it('should set item checkbox value depending on the "hidden" property', () => {
    const tree = mount(
      <ColumnChooserPanelItem
        column={{ name: 'a', title: 'A' }}
        hidden={false}
      />,
    );

    expect(tree.find('input[type="checkbox"]').prop('checked'))
      .toBe(true);

    tree.setProps({ hidden: true });

    expect(tree.find('input[type="checkbox"]').prop('checked'))
      .toBe(false);
  });

  it('should call the "onClick" on the checkbox "onChange" event', () => {
    const toggleHandler = jest.fn();
    const tree = mount(
      <ColumnChooserPanelItem
        column={{ name: 'a', title: 'A' }}
        hidden={false}
        onClick={toggleHandler}
      />,
    );

    tree.find('input[type="checkbox"]')
      .first()
      .prop('onChange')('a');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
    expect(toggleHandler)
      .toHaveBeenCalledWith('a');
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

    tree.find('button')
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

    expect(tree.find('button').text().trim())
      .toBe('A');

    tree.setProps({ column: { name: 'b' } });

    expect(tree.find('button').text().trim())
      .toBe('b');
  });
});
