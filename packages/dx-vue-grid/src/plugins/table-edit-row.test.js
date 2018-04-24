import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { PluginHost, TemplatePlaceholder } from '@devexpress/dx-vue-core';
import {
  getRowChange,
  tableRowsWithEditing,
  isEditTableCell,
  isEditTableRow,
  isAddedTableRow,
} from '@devexpress/dx-grid-core';
import { TableEditRow } from './table-edit-row';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  getRowChange: jest.fn(),
  tableRowsWithEditing: jest.fn(),
  isEditTableCell: jest.fn(),
  isEditTableRow: jest.fn(),
  isAddedTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableBodyRows: [{ type: 'undefined', rowId: 1 }],
    editingRowIds: [1, 2],
    addedRows: [{ a: 'text' }, {}],
    rowChanges: [{ 1: { a: 'text' } }],
    getCellValue: jest.fn(),
    createRowChange: jest.fn(),
    isColumnEditingEnabled: () => true,
  },
  action: {
    changeAddRow: jest.fn(),
    changeRow: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: { a: 'a' } },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: { a: 'a' } },
      style: {},
    },
  },
  plugins: ['EditingState', 'Table'],
};

const defaultProps = {
  cellComponent: { name: 'Cell', render() { return null; } },
  rowComponent: { name: 'Row', render() { return null; } },
};

describe('TableEditRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    getRowChange.mockImplementation(() => ({}));
    tableRowsWithEditing.mockImplementation(() => 'tableRowsWithEditing');
    isEditTableCell.mockImplementation(() => false);
    isAddedTableRow.mockImplementation(() => false);
    isEditTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount({
        render() {
          return (
            <PluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <TableEditRow
                {...{ attrs: { ...defaultProps } }}
                rowHeight={120}
              />
            </PluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithEditing');
      expect(tableRowsWithEditing)
        .toBeCalledWith(
          defaultDeps.getter.tableBodyRows,
          defaultDeps.getter.editingRowIds,
          defaultDeps.getter.addedRows,
          120,
        );
    });
  });

  it('should render edit cell on user-defined column and edit row intersection', () => {
    isEditTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <TableEditRow
              {...{ attrs: { ...defaultProps } }}
              rowHeight={120}
            />
          </PluginHost>
        );
      },
    });

    expect(defaultDeps.getter.getCellValue)
      .toBeCalledWith(
        { ...defaultDeps.template.tableCell.tableRow.row },
        defaultDeps.template.tableCell.tableColumn.column.name,
      );
    expect(isEditTableCell)
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

  it('should render edit row by using rowComponent', () => {
    isEditTableRow.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <TableEditRow
              {...{ attrs: { ...defaultProps } }}
              rowHeight={120}
            />
          </PluginHost>
        );
      },
    });

    expect(isEditTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        row: defaultDeps.template.tableRow.tableRow.row,
      });
  });

  it('should render new row by using rowComponent', () => {
    isAddedTableRow.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <TableEditRow
              {...{ attrs: { ...defaultProps } }}
              rowHeight={120}
            />
          </PluginHost>
        );
      },
    });

    expect(isAddedTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        row: defaultDeps.template.tableRow.tableRow.row,
      });
  });

  it('should handle edit cell onValueChange event', () => {
    isEditTableCell.mockImplementation(() => true);
    getRowChange.mockImplementation(() => ({ a: undefined }));
    const deps = {
      template: {
        tableCell: {
          tableRow: { row: { a: 'a1', b: 'b1' } },
          tableColumn: { column: { name: 'column' } },
        },
      },
    };

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} depsOverrides={deps} />
            <TableEditRow
              {...{ attrs: { ...defaultProps } }}
              rowHeight={120}
            />
          </PluginHost>
        );
      },
    });

    tree.find(defaultProps.cellComponent).vm.$emit('valueChange', 'test');

    expect(defaultDeps.getter.createRowChange)
      .toBeCalledWith({
        a: undefined,
        b: 'b1',
      }, 'test', 'column');
  });

  it('can render custom editors', () => {
    isEditTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <PluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <TableEditRow
              {...{ attrs: { ...defaultProps } }}
              rowHeight={120}
            />
          </PluginHost>
        );
      },
    });

    const valueEditorTemplatePlaceholder = tree.findAll(TemplatePlaceholder)
      .filter(wrapper => wrapper.vm.name === 'valueEditor').at(0);

    expect(valueEditorTemplatePlaceholder.vm.params)
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        row: defaultDeps.template.tableCell.tableRow.row,
        value: defaultDeps.getter.getCellValue(),
        onValueChange: expect.any(Function),
      });
  });
});
