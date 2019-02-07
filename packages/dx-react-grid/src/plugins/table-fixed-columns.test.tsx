import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { PluginHost, Template, TemplatePlaceholder } from '@devexpress/dx-react-core';
import {
  FIXED_COLUMN_LEFT_SIDE,
  FIXED_COLUMN_RIGHT_SIDE,
  TABLE_DATA_TYPE,
  getFixedColumnKeys,
  tableColumnsWithFixed,
  tableHeaderRowsWithFixed,
  tableHeaderColumnChainsWithFixed,
  isFixedTableRow,
} from '@devexpress/dx-grid-core';
import { TableFixedColumns } from './table-fixed-columns';

jest.mock('@devexpress/dx-grid-core', () => ({
  ...require.requireActual('@devexpress/dx-grid-core'),
  getFixedColumnKeys: jest.fn(),
  tableColumnsWithFixed: jest.fn(),
  tableHeaderRowsWithFixed: jest.fn(),
  tableHeaderColumnChainsWithFixed: jest.fn(),
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
    tableHeaderColumnChainsWithFixed.mockImplementation(() => 'tableHeaderColumnChainsWithFixed');
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
    const columns = [
      { key: 'a', column: { name: 'a', xx: 'yyy' }, fixed: FIXED_COLUMN_LEFT_SIDE },
      { key: 'b', column: { name: 'b' }, fixed: FIXED_COLUMN_LEFT_SIDE },
    ];
    tableColumnsWithFixed.mockImplementation(() => [...columns, {}]);
    tableHeaderColumnChainsWithFixed.mockImplementation(() => [
      [
        { start: 0, fixed: FIXED_COLUMN_LEFT_SIDE, columns },
        { start: 2, columns: [{}] },
      ],
    ]);
    const leftColumns = ['a', 'b'];
    const deps = {
      template: {
        tableCell: {
          tableRow: { rowId: 1, row: 'row' },
          tableColumn: columns[1],
        },
      },
    };

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <TableFixedColumns
          {...defaultProps}
          leftColumns={leftColumns}
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
    const columns = [
      {
        key: 'a', column: { name: 'a' }, type: TABLE_DATA_TYPE, fixed: FIXED_COLUMN_LEFT_SIDE,
      },
      {
        key: 'b', column: { name: 'b' }, type: TABLE_DATA_TYPE, fixed: FIXED_COLUMN_LEFT_SIDE,
      },
    ];
    getFixedColumnKeys.mockImplementation(() => ['a', 'b']);
    tableColumnsWithFixed.mockImplementation(() => columns);
    tableHeaderColumnChainsWithFixed.mockImplementation(() => [
      [
        { start: 0, fixed: FIXED_COLUMN_LEFT_SIDE, columns },
      ],
    ]);
    isFixedTableRow.mockImplementation(tableRow => tableRow.type === 'fixed');
    const leftColumns = ['a', 'b'];

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
          leftColumns={leftColumns}
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

  it('should render right columns in correct order', () => {
    const columns = [
      {
        key: 'a', column: { name: 'a' }, type: TABLE_DATA_TYPE, fixed: FIXED_COLUMN_RIGHT_SIDE,
      },
      {
        key: 'b', column: { name: 'b' }, type: TABLE_DATA_TYPE, fixed: FIXED_COLUMN_RIGHT_SIDE,
      },
    ];
    getFixedColumnKeys.mockImplementation(() => ['a', 'b']);
    tableColumnsWithFixed.mockImplementation(() => columns);
    tableHeaderColumnChainsWithFixed.mockImplementation(() => [
      [
        { start: 0, fixed: FIXED_COLUMN_LEFT_SIDE, columns },
      ],
    ]);
    isFixedTableRow.mockImplementation(tableRow => tableRow.type === 'fixed');
    const rightColumns = ['a', 'b'];

    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <Template name="root">
          <TemplatePlaceholder
            name="tableCell"
            params={{ tableColumn: { key: 'a', column: { name: 'a' }, fixed: FIXED_COLUMN_RIGHT_SIDE }, tableRow: { type: 'row' } }}
          />
          <TemplatePlaceholder
            name="tableCell"
            params={{ tableColumn: { key: 'b', column: { name: 'b' }, fixed: FIXED_COLUMN_RIGHT_SIDE }, tableRow: { type: 'fixed' } }}
          />
        </Template>
        <TableFixedColumns
          {...defaultProps}
          rightColumns={rightColumns}
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
