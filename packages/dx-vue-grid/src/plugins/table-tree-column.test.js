import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost, DxTemplatePlaceholder } from '@devexpress/dx-vue-core';
import { isTreeTableCell } from '@devexpress/dx-grid-core';
import { DxTableTreeColumn } from './table-tree-column';
import { PluginDepsToComponents } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  isTreeTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    expandedRowIds: [],
    getCellValue: row => row.value,
    getCollapsedRows: () => undefined,
    isTreeRowLeaf: () => true,
    getTreeRowLevel: () => 1,
  },
  action: {
    toggleRowExpanded: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: { value: 'value' } },
      tableColumn: { type: 'undefined', rowId: 1, column: { name: 'a' } },
      style: {},
    },
  },
  plugins: ['DxTreeDataState', 'DxTable'],
};

const defaultProps = {
  for: 'a',
  cellComponent: { name: 'Cell', render() { return <div>{this.$slots.default}</div>; } },
  indentComponent: { name: 'Indent', render() { return null; } },
  expandButtonComponent: { name: 'ExpandButton', render() { return null; } },
  checkboxComponent: { name: 'Checkbox', render() { return null; } },
  contentComponent: { name: 'Content', render() { return null; } },
};

describe('DxTableTreeColumn', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  beforeEach(() => {
    isTreeTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('cellComponent', () => {
    it('should render tree cell on data column and data row intersection', () => {
      isTreeTableCell.mockImplementation(() => true);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableTreeColumn
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(isTreeTableCell)
        .toBeCalledWith(
          defaultDeps.template.tableCell.tableRow,
          defaultDeps.template.tableCell.tableColumn,
          defaultProps.for,
        );
      expect(tree.find(defaultProps.cellComponent).vm.$attrs)
        .toMatchObject({
          ...defaultDeps.template.tableCell,
          row: defaultDeps.template.tableCell.tableRow.row,
          column: defaultDeps.template.tableCell.tableColumn.column,
          value: defaultDeps.template.tableCell.tableRow.row.value,
        });
    });

    it('should provide correct params for indent', () => {
      isTreeTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          getTreeRowLevel: jest.fn(() => 2),
        },
        template: {
          tableCell: {
            tableRow: { row: { value: '1' }, rowId: 'rowId' },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} depsOverrides={deps} />
              <DxTableTreeColumn
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });
      expect(tree.find(defaultProps.indentComponent).vm.$attrs)
        .toMatchObject({
          level: 2,
        });
      expect(deps.getter.getTreeRowLevel)
        .toBeCalledWith(deps.template.tableCell.tableRow.row);
    });

    it('should provide correct params for toggle button', () => {
      isTreeTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          expandedRowIds: [],
          isTreeRowLeaf: jest.fn(() => false),
        },
        template: {
          tableCell: {
            tableRow: { row: { value: '1' }, level: 1, rowId: 'rowId' },
            tableColumn: { column: { name: 'a' } },
          },
        },
      };
      jest.spyOn(deps.getter.expandedRowIds, 'indexOf').mockReturnValue(1);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} depsOverrides={deps} />
              <DxTableTreeColumn
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });
      expect(tree.find(defaultProps.expandButtonComponent).vm.$attrs)
        .toMatchObject({
          visible: true,
          expanded: true,
        });
      expect(tree.find(defaultProps.expandButtonComponent).vm.$listeners)
        .toMatchObject({
          toggle: expect.any(Function),
        });
      expect(deps.getter.expandedRowIds.indexOf)
        .toBeCalledWith('rowId');
      expect(deps.getter.isTreeRowLeaf)
        .toBeCalledWith(deps.template.tableCell.tableRow.row);

      tree.find(defaultProps.expandButtonComponent).vm.$listeners.toggle();
      expect(defaultDeps.action.toggleRowExpanded.mock.calls[0][0])
        .toEqual({ rowId: 'rowId' });
    });

    it('should provide correct params for checkbox', () => {
      isTreeTableCell.mockImplementation(() => true);

      const deps = {
        getter: {
          selection: [],
          isTreeRowLeaf: jest.fn(() => false),
        },
        action: {
          toggleSelection: jest.fn(),
        },
        template: {
          tableCell: {
            tableRow: { row: { value: '1' }, level: 1, rowId: 'rowId' },
            tableColumn: { column: { name: 'a' } },
          },
        },
        plugins: ['DxSelectionState'],
      };
      jest.spyOn(deps.getter.selection, 'indexOf').mockReturnValue(1);

      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} depsOverrides={deps} />
              <DxTableTreeColumn
                {...{ attrs: { ...defaultProps } }}
                showSelectionControls
              />
            </DxPluginHost>
          );
        },
      });
      expect(tree.find(defaultProps.checkboxComponent).vm.$attrs)
        .toMatchObject({
          disabled: false,
          checked: true,
        });
      expect(tree.find(defaultProps.checkboxComponent).vm.$listeners)
        .toMatchObject({
          change: expect.any(Function),
        });
      expect(deps.getter.selection.indexOf)
        .toBeCalledWith('rowId');

      tree.find(defaultProps.checkboxComponent).vm.$listeners.change();
      expect(deps.action.toggleSelection.mock.calls[0][0])
        .toEqual({ rowIds: ['rowId'] });
    });
  });

  it('can render custom formatted data in cell', () => {
    isTreeTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableTreeColumn
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    const valueFormatterTemplatePlaceholder = tree
      .findAll(DxTemplatePlaceholder)
      .wrappers
      .filter(wrapper => wrapper.props().name === 'valueFormatter')[0];

    expect(valueFormatterTemplatePlaceholder.vm.$attrs)
      .toMatchObject({
        column: defaultDeps.template.tableCell.tableColumn.column,
        row: defaultDeps.template.tableCell.tableRow.row,
        value: defaultDeps.template.tableCell.tableRow.row.value,
      });
  });
});
