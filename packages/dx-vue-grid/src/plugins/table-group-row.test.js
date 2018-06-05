import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost, DxTemplatePlaceholder } from '@devexpress/dx-vue-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
  isGroupTableCell,
  isGroupIndentTableCell,
  isGroupTableRow,
  tableGroupCellColSpanGetter,
} from '@devexpress/dx-grid-core';
import { DxTableGroupRow } from './table-group-row';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithGrouping: jest.fn(),
  tableRowsWithGrouping: jest.fn(),
  isGroupTableCell: jest.fn(),
  isGroupIndentTableCell: jest.fn(),
  isGroupTableRow: jest.fn(),
  tableGroupCellColSpanGetter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    columns: [{ name: 'a' }, { name: 'b' }],
    tableColumns: [{ type: 'undefined', id: 1, column: 'column' }],
    tableBodyRows: [{ type: 'undefined', id: 1, row: 'row' }],
    grouping: [{ columnName: 'a' }],
    expandedGroups: [],
    isGroupRow: () => false,
    getTableCellColSpan: () => 1,
  },
  action: {
    toggleGroupExpanded: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', id: 1, row: 'row' },
      tableColumn: { type: 'undefined', id: 1, column: { name: 'a' } },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', id: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['DxGroupingState', 'DxTable'],
};

const defaultProps = {
  cellComponent: { name: 'Cell', render() { return null; } },
  indentCellComponent: { name: 'IndentCell', render() { return null; } },
  rowComponent: { name: 'Row', render() { return null; } },
  indentColumnWidth: 100,
};

describe('DxTableGroupRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    tableColumnsWithGrouping.mockImplementation(() => 'tableColumnsWithGrouping');
    tableRowsWithGrouping.mockImplementation(() => 'tableRowsWithGrouping');
    isGroupTableCell.mockImplementation(() => false);
    isGroupIndentTableCell.mockImplementation(() => false);
    isGroupTableRow.mockImplementation(() => false);
    tableGroupCellColSpanGetter.mockImplementation(() => 'tableGroupCellColSpanGetter');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters extending', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableGroupRow
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithGrouping');
      expect(tableRowsWithGrouping)
        .toBeCalledWith(defaultDeps.getter.tableBodyRows, defaultDeps.getter.isGroupRow);
    });

    it('should extend tableColumns', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableGroupRow
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      expect(tableColumnsWithGrouping)
        .toBeCalledWith(
          defaultDeps.getter.columns,
          defaultDeps.getter.tableColumns,
          defaultDeps.getter.grouping,
          defaultDeps.getter.grouping,
          defaultProps.indentColumnWidth,
          expect.any(Function),
        );
    });

    it('should extend getTableCellColSpan', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableGroupRow
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe('tableGroupCellColSpanGetter');
      expect(tableGroupCellColSpanGetter)
        .toBeCalledWith(defaultDeps.getter.getTableCellColSpan);
    });
  });

  describe('hide grouping column', () => {
    it('should all columns be hidden', () => {
      const deps = {
        getter: {
          columns: [
            { name: 'A' },
            { name: 'B' },
          ],
        },
      };
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} ovedepsOverrides={deps} />
              <DxTableGroupRow
                {...{ attrs: { ...defaultProps } }}
                showColumnsWhenGrouped
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBeTruthy();
      expect(showColumnWhenGrouped('B')).toBeTruthy();
    });

    it('should keep column in table if column value specified', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableGroupRow
                {...{ attrs: { ...defaultProps } }}
                showColumnsWhenGrouped={false}
                columnExtensions={[
                  { columnName: 'A', showWhenGrouped: true },
                ]}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithGrouping');
      const showColumnWhenGrouped = tableColumnsWithGrouping.mock.calls[0][5];
      expect(showColumnWhenGrouped('A')).toBeTruthy();
      expect(showColumnWhenGrouped('B')).toBeFalsy();
    });
  });

  it('should render groupIndent cell on select group column and foreign group row intersection', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupIndentTableCell.mockImplementation(() => true);

    const indentCellComponent = { name: 'IndentCell', render() { return null; } };
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableGroupRow
              {...{ attrs: { ...defaultProps } }}
              indentCellComponent={indentCellComponent}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isGroupIndentTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
        defaultDeps.getter.grouping,
      );
    expect(tree.find(indentCellComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
        column: defaultDeps.template.tableCell.tableColumn.column,
      });
  });

  describe('cellComponent', () => {
    it('should render group cell on select group column and group row intersection', () => {
      isGroupTableRow.mockImplementation(() => true);
      isGroupTableCell.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableGroupRow
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(isGroupTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
        );
      expect(tree.find(defaultProps.cellComponent).vm.$attrs)
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
          column: defaultDeps.template.tableCell.tableColumn.column,
        });
    });

    it('should provide correct cell params', () => {
      isGroupTableRow.mockImplementation(() => true);
      isGroupTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          expandedGroups: [],
        },
        template: {
          tableCell: {
            tableRow: { row: { compoundKey: '1' } },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };
      jest.spyOn(deps.getter.expandedGroups, 'indexOf').mockReturnValue(1);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={{ ...defaultDeps, ...deps }} />
              <DxTableGroupRow
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });
      expect(tree.find(defaultProps.cellComponent).vm.$attrs)
        .toMatchObject({
          expanded: true,
        });
      expect(deps.getter.expandedGroups.indexOf)
        .toBeCalledWith('1');

      tree.find(defaultProps.cellComponent).vm.$emit('toggle');
      expect(defaultDeps.action.toggleGroupExpanded.mock.calls[0][0])
        .toEqual({ groupKey: '1' });
    });
  });

  it('can render custom formatted data in group row cell', () => {
    isGroupTableRow.mockImplementation(() => true);
    isGroupTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableGroupRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    const valueFormatterTemplatePlaceholder = tree.findAll(DxTemplatePlaceholder)
      .filter(wrapper => wrapper.vm.name === 'valueFormatter').at(0);

    expect(valueFormatterTemplatePlaceholder.vm.$attrs)
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        value: defaultDeps.template.tableCell.tableRow.row.value,
      });
  });

  it('should render row by using rowComponent', () => {
    isGroupTableRow.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableGroupRow
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isGroupTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        row: defaultDeps.template.tableRow.tableRow.row,
      });
  });
});
