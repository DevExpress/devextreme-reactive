import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  fixedColumnKeys,
  isFixedCell,
  getFixedSide,
} from '@devexpress/dx-grid-core';
import { TableFixedColumns } from './table-fixed-columns';

jest.mock('@devexpress/dx-grid-core', () => ({
  FIXED_COLUMN_BEFORE_SIDE: 'BEFORE',
  isFixedCell: jest.fn(),
  getFixedSide: jest.fn(),
  fixedColumnKeys: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [],
  },
  template: {
    tableCell: {
      tableRow: { rowId: 1, row: 'row' },
      tableColumn: { column: { name: 'column' } },
    },
  },
  plugins: ['Table'],
};

const defaultProps = {
  cellComponent: () => null,
};

describe('TableFixedColumns', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    isFixedCell.mockImplementation(() => true);
    getFixedSide.mockImplementation(() => 'BEFORE');
    fixedColumnKeys.mockImplementation(() => 'fixedColumnKeys');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the "fixedColumnKeys" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFixedColumns
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).fixedColumnKeys)
      .toBe('fixedColumnKeys');
  });

  it('can render fixed cells', () => {
    const beforeColumnNames = ['a'];
    const afterColumnNames = ['b'];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFixedColumns
          {...defaultProps}
          beforeColumnNames={beforeColumnNames}
          afterColumnNames={afterColumnNames}
        />
      </PluginHost>
    ));

    expect(isFixedCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableColumn.column.name,
        beforeColumnNames,
        afterColumnNames,
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        side: 'left',
        showDivider: false,
        component: expect.any(Function),
        storeSize: expect.any(Function),
        getPosition: expect.any(Function),
      });
  });
});
