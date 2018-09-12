import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
import { PluginHost, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  FIXED_COLUMN_LEFT_SIDE,
  getFixedColumnKeys,
  tableColumnsWithFixed,
  tableHeaderRowsWithFixed,
  isFixedTableRow,
} from '@devexpress/dx-grid-core';
import { TableFixedColumns } from './table-fixed-columns';

jest.mock('@devexpress/dx-grid-core', () => ({
  FIXED_COLUMN_LEFT_SIDE: 'LEFT',
  getFixedColumnKeys: jest.fn(),
  tableColumnsWithFixed: jest.fn(),
  tableHeaderRowsWithFixed: jest.fn(),
  isFixedTableRow: jest.fn(),
}));

const defaultDeps = {
  plugins: ['Table'],
  getter: {
    tableColumns: [],
  },
};

const defaultProps = {
  cellComponent: () => null,
  listenerRowComponent: () => null,
  listenerCellComponent: () => null,
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
    tableHeaderRowsWithFixed.mockImplementation(() => 'tableHeaderRowsWithFixed');
    isFixedTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should define the tableColumns getter', () => {
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
      expect(tableColumnsWithFixed)
        .toBeCalledWith(
          defaultDeps.getter.tableColumns,
          [],
          [],
          [],
          [],
        );
    });

    it('should extend tableHeaderRows', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <TableFixedColumns
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(getComputedState(tree).tableHeaderRows)
        .toBe('tableHeaderRowsWithFixed');
      expect(tableHeaderRowsWithFixed)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows);
    });
  });

  it('can render fixed cells', () => {
    tableColumnsWithFixed.mockImplementation(() => [
      { column: { name: 'a' }, fixed: FIXED_COLUMN_LEFT_SIDE },
    ]);
    const leftColumnNames = ['a'];
    const deps = {
      template: {
        tableCell: {
          tableRow: { rowId: 1, row: 'row' },
          tableColumn: { column: { name: 'column' }, fixed: FIXED_COLUMN_LEFT_SIDE },
        },
      },
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableFixedColumns
          {...defaultProps}
          leftColumnNames={leftColumnNames}
        />
      </PluginHost>
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        ...deps.template.tableCell,
        side: FIXED_COLUMN_LEFT_SIDE,
        showLeftDivider: false,
        showRightDivider: true,
        component: expect.any(Function),
        position: 0,
      });
  });

  it('should render row by using listenerRowComponent', () => {
    isFixedTableRow.mockImplementation(() => true);
    const deps = {
      template: {
        tableRow: {
          tableRow: { rowId: 1, row: 'row' },
        },
      },
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableFixedColumns
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(isFixedTableRow)
      .toBeCalledWith(deps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.listenerRowComponent).props())
      .toMatchObject(deps.template.tableRow);
  });

  it('takes column widths into account', () => {
    getFixedColumnKeys.mockImplementation(() => ['a', 'b']);
    tableColumnsWithFixed.mockImplementation(() => [
      { key: 'a', column: { name: 'a' }, fixed: FIXED_COLUMN_LEFT_SIDE },
      { key: 'b', column: { name: 'b' }, fixed: FIXED_COLUMN_LEFT_SIDE },
    ]);
    isFixedTableRow.mockImplementation(tableRow => tableRow.type === 'fixed');
    const leftColumnNames = ['a', 'b'];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template name="root">
          <TemplatePlaceholder
            name="tableCell"
            params={{ tableColumn: { key: 'b', column: { name: 'b' }, fixed: FIXED_COLUMN_LEFT_SIDE }, tableRow: { type: 'row' } }}
          />
          <TemplatePlaceholder
            name="tableCell"
            params={{ tableColumn: { key: 'a', column: { name: 'a' }, fixed: FIXED_COLUMN_LEFT_SIDE }, tableRow: { type: 'fixed' } }}
          />
        </Template>
        <TableFixedColumns
          {...defaultProps}
          leftColumnNames={leftColumnNames}
        />
      </PluginHost>
    ));

    tree.find(defaultProps.listenerCellComponent).prop('onSizeChange')({ width: 200 });
    tree.update();
    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        position: 200,
      });
  });
});
