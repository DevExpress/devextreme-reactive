import React from 'react';
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

    expect(tree.find('input[type="checkbox"]').prop('checked'))
      .toBe(true);

    tree.setProps({ item: { column: { name: 'a', title: 'A' }, hidden: true } });

    expect(tree.find('input[type="checkbox"]').prop('checked'))
      .toBe(false);
  });

  it('should call the "onToggle" on the checkbox "onChange" event', () => {
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

    tree.find('input[type="checkbox"]')
      .first()
      .prop('onChange')('a');

    expect(toggleHandler)
      .toHaveBeenCalledTimes(1);
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

    tree.find('button')
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

    expect(tree.find('button').text().trim())
      .toBe('A');

    tree.setProps({ item: { column: { name: 'b' } } });

    expect(tree.find('button').text().trim())
      .toBe('b');
  });
});
