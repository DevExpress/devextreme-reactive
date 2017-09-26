import React from 'react';
import { mount } from 'enzyme';
import { columnChooserItems } from '@devexpress/dx-grid-core';
import { ColumnChooser } from './column-chooser';

jest.mock('@devexpress/dx-grid-core', () => ({
  columnChooserItems: jest.fn(() => []),
}));

describe('ColumnChooser', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render root template with correct parameters', () => {
    const contentTemplate = jest.fn(() => null);
    mount(
      <ColumnChooser
        columns={[{ name: 'a' }, { name: 'b' }]}
        contentTemplate={contentTemplate}
        onHiddenColumnsChange={() => {}}
      />,
    );

    expect(contentTemplate)
      .toHaveBeenCalledTimes(1);
    expect(contentTemplate.mock.calls[0][0])
      .toMatchObject({
        columnChooserItems: expect.any(Array),
        onColumnToggle: expect.any(Function),
      });
  });

  it('should calculate items via the "columnChooserItems" computed', () => {
    const columns = [{ name: 'a' }, { name: 'b' }];
    const hiddenColumns = ['a'];
    mount(
      <ColumnChooser
        columns={columns}
        hiddenColumns={hiddenColumns}
        contentTemplate={() => null}
      />,
    );

    expect(columnChooserItems)
      .toHaveBeenCalledTimes(1);
    expect(columnChooserItems)
      .toHaveBeenCalledWith(columns, hiddenColumns);
  });
});
