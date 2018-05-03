import { mount } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { DxPluginHost } from '@devexpress/dx-vue-core';
import {
  tableRowsWithExpandedDetail,
  tableDetailCellColSpanGetter,
  isDetailRowExpanded,
  tableColumnsWithDetail,
  isDetailToggleTableCell,
  isDetailTableRow,
  isDetailTableCell,
} from '@devexpress/dx-grid-core';
import { DxTableRowDetail } from './table-row-detail';
import { PluginDepsToComponents, getComputedState } from './test-utils';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableRowsWithExpandedDetail: jest.fn(),
  tableDetailCellColSpanGetter: jest.fn(),
  isDetailRowExpanded: jest.fn(),
  tableColumnsWithDetail: jest.fn(),
  isDetailToggleTableCell: jest.fn(),
  isDetailTableRow: jest.fn(),
  isDetailTableCell: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [{ type: 'undefined', column: 'column' }],
    tableBodyRows: [{ type: 'undefined', rowId: 1, row: 'row' }],
    expandedDetailRowIds: { onClick: () => {} },
    getTableCellColSpan: () => 1,
  },
  action: {
    toggleDetailRowExpanded: jest.fn(),
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
  plugins: ['DxRowDetailState', 'DxTable'],
};

const defaultProps = {
  toggleCellComponent: { name: 'ToggleCell', render: () => null },
  cellComponent: {
    name: 'Cell',
    render() {
      return (<td>{this.$slots.default}</td>);
    },
  },
  rowComponent: { name: 'Row', render: () => null },
  contentComponent: { name: 'Content', render: () => null },
  toggleColumnWidth: 100,
};

describe('DxTableRowDetail', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    tableRowsWithExpandedDetail.mockImplementation(() => 'tableRowsWithExpandedDetail');
    tableDetailCellColSpanGetter.mockImplementation(() => 'tableDetailCellColSpanGetter');
    isDetailRowExpanded.mockImplementation(() => false);
    tableColumnsWithDetail.mockImplementation(() => 'tableColumnsWithDetail');
    isDetailToggleTableCell.mockImplementation(() => false);
    isDetailTableRow.mockImplementation(() => false);
    isDetailTableCell.mockImplementation(() => false);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('table layout getters', () => {
    it('should extend tableBodyRows', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableRowDetail
                {...{ attrs: { ...defaultProps } }}
                rowHeight={120}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableBodyRows)
        .toBe('tableRowsWithExpandedDetail');
      expect(tableRowsWithExpandedDetail)
        .toBeCalledWith(
          defaultDeps.getter.tableBodyRows,
          defaultDeps.getter.expandedDetailRowIds,
          120,
        );
    });

    it('should extend tableColumns', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableRowDetail
                {...{ attrs: { ...defaultProps } }}
                toggleColumnWidth={120}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).tableColumns)
        .toBe('tableColumnsWithDetail');
      expect(tableColumnsWithDetail)
        .toBeCalledWith(defaultDeps.getter.tableColumns, 120);
    });

    it('should extend getTableCellColSpan', () => {
      const tree = mount({
        render() {
          return (
            <DxPluginHost>
              <PluginDepsToComponents deps={defaultDeps} />
              <DxTableRowDetail
                {...{ attrs: { ...defaultProps } }}
              />
            </DxPluginHost>
          );
        },
      });

      expect(getComputedState(tree).getTableCellColSpan)
        .toBe('tableDetailCellColSpanGetter');
      expect(tableDetailCellColSpanGetter)
        .toBeCalledWith(defaultDeps.getter.getTableCellColSpan);
    });
  });

  it('should render detailToggle cell on detail column and user-defined row intersection', () => {
    isDetailToggleTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableRowDetail
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isDetailToggleTableCell)
      .toBeCalledWith(
        defaultDeps.template.tableCell.tableRow,
        defaultDeps.template.tableCell.tableColumn,
      );
    expect(tree.find(defaultProps.toggleCellComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
      });
  });

  it('should render detail cell on detail row', () => {
    isDetailTableRow.mockImplementation(() => true);
    isDetailTableCell.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableRowDetail
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isDetailTableRow)
      .toBeCalledWith(defaultDeps.template.tableCell.tableRow);
    expect(tree.find(defaultProps.cellComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableCell,
        row: defaultDeps.template.tableCell.tableRow.row,
      });

    expect(tree.find(defaultProps.contentComponent).vm.$attrs)
      .toMatchObject({
        row: defaultDeps.template.tableCell.tableRow.row,
      });
  });

  it('should render row by using rowComponent', () => {
    isDetailTableRow.mockImplementation(() => true);

    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <PluginDepsToComponents deps={defaultDeps} />
            <DxTableRowDetail
              {...{ attrs: { ...defaultProps } }}
            />
          </DxPluginHost>
        );
      },
    });

    expect(isDetailTableRow)
      .toBeCalledWith(defaultDeps.template.tableRow.tableRow);
    expect(tree.find(defaultProps.rowComponent).vm.$attrs)
      .toMatchObject({
        ...defaultDeps.template.tableRow,
        row: defaultDeps.template.tableRow.tableRow.row,
      });
  });
});
