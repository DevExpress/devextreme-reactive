import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost } from '@devexpress/dx-react-core';
import {
  FIXED_COLUMN_BEFORE_SIDE,
  getFixedColumnKeys,
  tableColumnsWithFixed,
} from '@devexpress/dx-grid-core';
import { TableFixedColumns } from './table-fixed-columns';

jest.mock('@devexpress/dx-grid-core', () => ({
  FIXED_COLUMN_BEFORE_SIDE: 'BEFORE',
  getFixedColumnKeys: jest.fn(),
  tableColumnsWithFixed: jest.fn(),
}));

const defaultDeps = {
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
    getFixedColumnKeys.mockImplementation(() => []);
    tableColumnsWithFixed.mockImplementation(() => 'tableColumnsWithFixed');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the "tableColumns" getter', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <TableFixedColumns
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(getComputedState(tree).tableColumns)
      .toEqual('tableColumnsWithFixed');
  });

  it('can render fixed cells', () => {
    tableColumnsWithFixed.mockImplementation(() => [
      { column: { name: 'a' }, fixed: FIXED_COLUMN_BEFORE_SIDE },
    ]);
    const beforeColumnNames = ['a'];
    const deps = {
      template: {
        tableCell: {
          tableRow: { rowId: 1, row: 'row' },
          tableColumn: { column: { name: 'column' }, fixed: FIXED_COLUMN_BEFORE_SIDE },
        },
      },
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableFixedColumns
          {...defaultProps}
          beforeColumnNames={beforeColumnNames}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...deps.template.tableCell,
        side: FIXED_COLUMN_BEFORE_SIDE,
        showLeftDivider: false,
        showRightDivider: true,
        component: expect.any(Function),
        storeSize: expect.any(Function),
        position: undefined,
      });
  });
});
