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
    const rootTemplate = jest.fn(() => null);
    mount(
      <ColumnChooser
        columns={[{ name: 'a' }, { name: 'b' }]}
        rootTemplate={rootTemplate}
        onHiddenColumnNamesChange={() => {}}
      />,
    );

    expect(rootTemplate)
      .toHaveBeenCalledTimes(1);
    expect(rootTemplate.mock.calls[0][0])
      .toMatchObject({
        columnChooserItems: expect.any(Array),
        onHiddenColumnNamesChange: expect.any(Function),
      });
  });

  it('should calculate items via the "columnChooserItems" computed', () => {
    const columns = [{ name: 'a' }, { name: 'b' }];
    const hiddenColumnNames = ['a'];
    mount(
      <ColumnChooser
        columns={columns}
        hiddenColumnNames={hiddenColumnNames}
        rootTemplate={() => null}
      />,
    );

    expect(columnChooserItems)
      .toHaveBeenCalledTimes(1);
    expect(columnChooserItems)
      .toHaveBeenCalledWith(columns, hiddenColumnNames);
  });
});
