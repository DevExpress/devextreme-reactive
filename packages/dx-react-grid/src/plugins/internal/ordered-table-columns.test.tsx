
import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  orderedColumns,
} from '@devexpress/dx-grid-core';
import { OrderedTableColumns } from './ordered-table-columns';

jest.mock('@devexpress/dx-grid-core', () => ({
  orderedColumns: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
  },
};

const defaultProps = {
  order: ['a', 'b'],
};

describe('OrderedTableColumns', () => {
  beforeEach(() => {
    orderedColumns.mockImplementation(() => 'orderedColumns');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should extend tableColumns', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <OrderedTableColumns
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).tableColumns)
      .toBe('orderedColumns');
    expect(orderedColumns)
      .toBeCalledWith(
        defaultDeps.getter.tableColumns,
        defaultProps.order,
      );
  });
});
