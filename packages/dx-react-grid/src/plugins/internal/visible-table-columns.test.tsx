
import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  visibleTableColumns,
} from '@devexpress/dx-grid-core';
import { VisibleTableColumns } from './visible-table-columns';

jest.mock('@devexpress/dx-grid-core', () => ({
  visibleTableColumns: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
  },
};

const defaultProps = {
  hiddenColumnNames: ['a', 'b'],
};

describe('VisibleTableColumns', () => {
  beforeEach(() => {
    visibleTableColumns.mockImplementation(() => 'visibleTableColumns');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should extend tableColumns', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <VisibleTableColumns
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).tableColumns)
      .toBe('visibleTableColumns');
    expect(visibleTableColumns)
      .toBeCalledWith(
        defaultDeps.getter.tableColumns,
        defaultProps.hiddenColumnNames,
      );
  });
});
