import React from 'react';
import { mount } from 'enzyme';
import { ColumnChooserPanel } from './column-chooser-panel';

describe('ColumnChooserPanel', () => {
  it('should render items with correct props', () => {
    const itemTemplate = jest.fn(() => <div />);
    const columnClickHandler = () => {};
    const columnChooserItems = [
      { column: { name: 'a', title: 'A' }, hidden: false },
      { column: { name: 'b' }, hidden: true },
    ];
    mount(
      <ColumnChooserPanel
        columnChooserItems={columnChooserItems}
        onColumnToggle={columnClickHandler}
        itemTemplate={itemTemplate}
      />,
    );

    expect(itemTemplate)
      .toHaveBeenCalledWith({
        column: columnChooserItems[0].column,
        hidden: columnChooserItems[0].hidden,
        onClick: columnClickHandler,
      });

    expect(itemTemplate)
      .toHaveBeenLastCalledWith({
        column: columnChooserItems[1].column,
        hidden: columnChooserItems[1].hidden,
        onClick: columnClickHandler,
      });
  });
});
