import React from 'react';
import { mount } from 'enzyme';
import { ColumnChooserPanel } from './column-chooser-panel';

describe('ColumnChooserPanel', () => {
  it('should set item checkbox value depending on the "hidden" property', () => {
    const tree = mount(
      <ColumnChooserPanel
        columnChooserItems={[
          { column: { name: 'a', title: 'A' }, hidden: false },
          { column: { name: 'b' }, hidden: true },
        ]}
      />,
    );
    const items = tree.find('input[type="checkbox"]');

    expect(items.at(0).prop('checked'))
      .toBe(true);
    expect(items.at(1).prop('checked'))
      .toBe(false);
  });

  it('should call the "onHiddenColumnNamesChange" on the checkbox "onChange" event', () => {
    const hiddenColumnNamesChange = jest.fn();
    const tree = mount(
      <ColumnChooserPanel
        columnChooserItems={[
          { column: { name: 'a', title: 'A' }, hidden: false },
          { column: { name: 'b' }, hidden: true },
        ]}
        onHiddenColumnNamesChange={hiddenColumnNamesChange}
      />,
    );

    tree.find('input[type="checkbox"]')
      .first()
      .prop('onChange')('a');

    expect(hiddenColumnNamesChange)
      .toHaveBeenCalledTimes(1);
    expect(hiddenColumnNamesChange)
      .toHaveBeenCalledWith('a');
  });

  it('should call the "onHiddenColumnNamesChange" on the list item "onClick" event', () => {
    const hiddenColumnNamesChange = jest.fn();
    const tree = mount(
      <ColumnChooserPanel
        columnChooserItems={[
          { column: { name: 'a', title: 'A' }, hidden: false },
          { column: { name: 'b' }, hidden: true },
        ]}
        onHiddenColumnNamesChange={hiddenColumnNamesChange}
      />,
    );

    tree.find('button')
      .first()
      .prop('onClick')('a');

    expect(hiddenColumnNamesChange)
      .toHaveBeenCalledTimes(1);
    expect(hiddenColumnNamesChange)
      .toHaveBeenCalledWith('a');
  });

  it('should render column title or name in each item', () => {
    const tree = mount(
      <ColumnChooserPanel
        columnChooserItems={[
          { column: { name: 'a', title: 'A' }, hidden: false },
          { column: { name: 'b' }, hidden: true },
        ]}
      />,
    );
    const items = tree.find('button');

    expect(items.at(0).text().trim())
      .toBe('A');
    expect(items.at(1).text().trim())
      .toBe('b');
  });
});
