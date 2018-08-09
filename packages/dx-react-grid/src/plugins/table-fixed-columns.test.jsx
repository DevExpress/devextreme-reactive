import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  FIXED_COLUMN_BEFORE_SIDE,
  getFixedColumnKeys,
  isFixedCell,
  getFixedSide,
} from '@devexpress/dx-grid-core';
import { TableFixedColumns } from './table-fixed-columns';

jest.mock('@devexpress/dx-grid-core', () => ({
  FIXED_COLUMN_BEFORE_SIDE: 'BEFORE',
  getFixedColumnKeys: jest.fn(),
  isFixedCell: jest.fn(),
  getFixedSide: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ key: 'a', column: { name: 'a' } }],
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
    getFixedColumnKeys.mockImplementation(() => ['x']);
    isFixedCell.mockImplementation(() => true);
    getFixedSide.mockImplementation(() => 'BEFORE');
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
      .toEqual(['x', 'x']);
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
        defaultDeps.template.tableCell.tableColumn,
        [...beforeColumnNames, ...afterColumnNames],
        [],
      );
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        side: FIXED_COLUMN_BEFORE_SIDE,
        showLeftDivider: false,
        showRightDivider: true,
        component: expect.any(Function),
        storeSize: expect.any(Function),
        getPosition: expect.any(Function),
      });
  });
});
