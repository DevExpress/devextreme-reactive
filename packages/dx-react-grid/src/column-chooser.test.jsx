import React from 'react';
import { mount } from 'enzyme';
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
    const containerTemplate = jest.fn(() => null);
    const itemTemplate = () => <div />;
    mount((
      <ColumnChooser
        columns={[{ name: 'a' }, { name: 'b' }]}
        containerTemplate={containerTemplate}
        itemTemplate={itemTemplate}
        onHiddenColumnsChange={() => {}}
      />
    ));

    expect(containerTemplate)
      .toHaveBeenCalledTimes(1);
    expect(containerTemplate)
      .toHaveBeenCalledWith({
        items: expect.any(Array),
        onItemToggle: expect.any(Function),
        children: expect.any(Array),
      });
  });

  it('should pass correct parameters to the itemTemplate', () => {
    // eslint-disable-next-line react/prop-types
    const containerTemplate = ({ children }) => <div>{children}</div>;
    const itemTemplate = jest.fn(() => <div />);
    mount((
      <ColumnChooser
        columns={[{ name: 'a' }, { name: 'b' }]}
        containerTemplate={containerTemplate}
        itemTemplate={itemTemplate}
        onHiddenColumnsChange={() => {}}
      />
    ));

    expect(itemTemplate)
      .toHaveBeenCalledTimes(1);
    expect(itemTemplate)
      .toHaveBeenCalledWith({
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
    mount((
      <ColumnChooser
        columns={columns}
        hiddenColumns={hiddenColumns}
        containerTemplate={() => null}
        itemTemplate={() => <div />}
      />
    ));

    expect(columnChooserItems)
      .toHaveBeenCalledTimes(1);
    expect(columnChooserItems)
      .toHaveBeenCalledWith(columns, hiddenColumns);
  });
});
