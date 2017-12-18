import React from 'react';
import { shallow } from 'enzyme';
import { columnChooserItems } from '@devexpress/dx-grid-core';
import { ColumnChooser } from './column-chooser';

jest.mock('@devexpress/dx-grid-core', () => ({
  columnChooserItems: jest.fn(),
}));

describe('ColumnChooser', () => {
  beforeEach(() => {
    columnChooserItems.mockImplementation(() => [{ column: { name: 'a' }, hidden: true }]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render container template with correct parameters', () => {
    const ContainerComponent = () => null;
    const ItemComponent = () => null;

    const tree = shallow((
      <ColumnChooser
        columns={[]}
        containerComponent={ContainerComponent}
        itemComponent={ItemComponent}
        onHiddenColumnsChange={() => {}}
      />
    ));

    expect(tree.find(ContainerComponent).props())
      .toEqual({
        items: expect.any(Array),
        onItemToggle: expect.any(Function),
        children: expect.any(Array),
      });
  });

  it('should pass correct parameters to the itemComponent', () => {
    const ContainerComponent = () => null;
    const ItemComponent = () => null;

    const tree = shallow((
      <ColumnChooser
        columns={[]}
        containerComponent={ContainerComponent}
        itemComponent={ItemComponent}
        onHiddenColumnsChange={() => {}}
      />
    ));

    expect(tree.find(ItemComponent).props())
      .toEqual({
        item: {
          column: { name: 'a' },
          hidden: true,
        },
        onToggle: expect.any(Function),
      });
  });

  it('should calculate items via the "columnChooserItems" computed', () => {
    const columns = [{ name: 'a' }, { name: 'b' }];
    const hiddenColumns = ['a'];

    shallow((
      <ColumnChooser
        columns={columns}
        hiddenColumns={hiddenColumns}
        containerComponent={() => null}
        itemComponent={() => null}
      />
    ));

    expect(columnChooserItems)
      .toHaveBeenCalledTimes(1);
    expect(columnChooserItems)
      .toHaveBeenCalledWith(columns, hiddenColumns);
  });
});
