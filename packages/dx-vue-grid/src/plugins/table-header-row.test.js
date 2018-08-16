import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import {
  tableRowsWithHeading,
  isHeadingTableCell,
  isHeadingTableRow,
  getColumnSortingDirection,
} from '@devexpress/dx-grid-core';
import { DxTableHeaderRow } from './table-header-row';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithHeading: jest.fn(),
  isHeadingTableCell: jest.fn(),
  isHeadingTableRow: jest.fn(),
  getColumnSortingDirection: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }],
    tableHeaderRows: [{ type: 'undefined', rowId: 1 }],
    isColumnSortingEnabled: () => false,
    tableColumns: [],
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['DxTable'],
};

const defaultProps = {
  cellComponent: { name: 'Cell', render() { return null; } },
  rowComponent: { name: 'Row', render() { return null; } },
};

describe('DxTableHeaderRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableRowsWithHeading.mockImplementation(() => 'tableRowsWithHeading');
    isHeadingTableCell.mockImplementation(() => false);
    isHeadingTableRow.mockImplementation(() => false);
    getColumnSortingDirection.mockImplementation(() => null);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableHeaderRows', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableHeaderRow
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableHeaderRows)
        .toBe('tableRowsWithHeading');
      expect(tableRowsWithHeading)
        .toBeCalledWith(defaultDeps.getter.tableHeaderRows);
    });
  });

  it('should render heading cell on user-defined column and heading row intersection', () => {
    isHeadingTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableHeaderRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isHeadingTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.cellComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  it('should render row by using rowComponent', () => {
    isHeadingTableRow.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableHeaderRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isHeadingTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject(defaultDeps.template.tableRow);
  });
});
