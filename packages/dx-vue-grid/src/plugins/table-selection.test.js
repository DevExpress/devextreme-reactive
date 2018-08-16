import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import {
  tableColumnsWithSelection,
  isSelectTableCell,
  isSelectAllTableCell,
  isDataTableRow,
} from '@devexpress/dx-grid-core';
import { DxTableSelection } from './table-selection';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithSelection: jest.fn(),
  isSelectTableCell: jest.fn(),
  isSelectAllTableCell: jest.fn(),
  isDataTableRow: jest.fn(),
}));

const defaultDeps = {
  getter: {
    selection: [1, 2],
  },
  action: {
    toggleSelection: jest.fn(),
  },
  template: {
    tableCell: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      tableColumn: { type: 'undefined', column: 'column' },
      style: {},
    },
    tableRow: {
      tableRow: { type: 'undefined', rowId: 1, row: 'row' },
      style: {},
    },
  },
  plugins: ['DxSelectionState', 'DxTable', 'DxIntegratedSelection'],
};

const defaultProps = {
  headerCellComponent: { name: 'HeaderCell', render() { return null; } },
  cellComponent: { name: 'Cell', render() { return null; } },
  rowComponent: { name: 'Row', render() { return null; } },
  selectionColumnWidth: 100,
};

describe('DxTable Selection', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableColumnsWithSelection.mockImplementation(() => 'tableColumnsWithSelection');
    isSelectTableCell.mockImplementation(() => false);
    isSelectAllTableCell.mockImplementation(() => false);
    isDataTableRow.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getter', () => {
    it('should extend tableColumns', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableSelection
                {...{ attrs: { ...defaultProps } }}
                selectionColumnWidth={120}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithSelection');
      expect(tableColumnsWithSelection)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });
  });

  it('should render select cell on select column and user-defined row intersection', () => {
    isSelectTableCell.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableSelection
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isSelectTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );

    expect(tree.find(defaultProps.cellComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
      });
  });

  it('should render selectAll cell on select column and heading row intersection', () => {
    isSelectAllTableCell.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableSelection
              {...{ attrs: { ...defaultProps } }}
              showSelectAll
            />
          </DxPluginHost>
        );
      },
    });

    expect(isSelectAllTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.headerCellComponent).vm.$attrs)
      .toMatchObject(defaultDeps.template.tableCell);
  });

  it('should render row by using rowComponent if selectByRowClick is true', () => {
    isDataTableRow.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableSelection
              {...{ attrs: { ...defaultProps } }}
              selectByRowClick
            />
          </DxPluginHost>
        );
      },
    });

    tree.find(defaultProps.rowComponent).vm.$listeners.toggle();
    expect(isDataTableRow).toBeCalledWith(defaultDeps.template.tableRow.tableRow);

    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        selectByRowClick: true,
        selected: false,
      });

    expect(defaultDeps.action.toggleSelection.mock.calls[0][0])
      .toEqual({
        rowIds: [defaultDeps.template.tableRow.tableRow.rowId],
      });
  });

  it('should render row by using rowComponent if highlightRow is true', () => {
    isDataTableRow.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableSelection
              {...{ attrs: { ...defaultProps } }}
              highlightRow
            />
          </DxPluginHost>
        );
      },
    });

    expect(isDataTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        selected: true,
      });
  });

  it('should not use rowComponent if highlightRow & selectByRowClick are false', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableSelection
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });


    expect(tree.find(defaultProps.rowComponent).exists())
      .toBeFalsy();
  });

  it('should pass the selectByRowClick prop to row component', () => {
    isDataTableRow.mockImplementation(() => true);
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableSelection
              {...{ attrs: { ...defaultProps } }}
              highlightRow
              selectByRowClick={false}
            />
          </DxPluginHost>
        );
      },
    });

    expect(tree.find(defaultProps.rowComponent).vm.$attrs.selectByRowClick)
      .toBe(false);
  });
});
