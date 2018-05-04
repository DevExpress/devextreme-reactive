import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { StaticTableLayout } from './static-table-layout';
import { ColumnGroup } from './column-group';
import { RowsBlockLayout } from './rows-block-layout';

const defaultProps = {
  columns: [
    { key: 'a', column: { name: 'a' } },
    { key: 'b', column: { name: 'b' } },
    { key: 'c', column: { name: 'c' } },
    { key: 'd', column: { name: 'd' } },
  ],
  minWidth: 400,
  bodyRows: [
    { key: 1, rowId: 1 },
    { key: 2, rowId: 2 },
    { key: 3, rowId: 3 },
  ],
  containerComponent: { name: 'Container', render() { return <div>{this.$slots.default}</div>; } },
  tableComponent: { name: 'Table', render() { return <div>{this.$slots.default}</div>; } },
  bodyComponent: { name: 'Body', render() { return null; } },
  cellComponent: { name: 'Cell', render() { return null; } },
  rowComponent: { name: 'Row', render() { return null; } },
  getCellColSpan: () => 1,
};

describe('StaticTableLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
    jest.clearAllMocks();
  });

  it('should render ColumnGroup', () => {
    const tree = shallow({
      render() {
        return (
          <StaticTableLayout
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    expect(tree.find(ColumnGroup).props())
      .toMatchObject({
        columns: defaultProps.columns,
      });
  });

  it('should render the body RowsBlockLayout', () => {
    const tree = shallow({
      render() {
        return (
          <StaticTableLayout
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    expect(tree.find(RowsBlockLayout).props())
      .toMatchObject({
        blockComponent: defaultProps.bodyComponent,
        cellComponent: defaultProps.cellComponent,
        rowComponent: defaultProps.rowComponent,
        columns: defaultProps.columns,
        rows: defaultProps.bodyRows,
        getCellColSpan: defaultProps.getCellColSpan,
      });
  });

  it('should render the head RowsBlockLayout', () => {
    const headComponent = { name: 'Body', render() { return null; } };
    const headerRows = defaultProps.bodyRows.slice(0, 1);

    const tree = shallow({
      render() {
        return (
          <StaticTableLayout
            {...{ attrs: { ...defaultProps } }}
            headComponent={headComponent}
            headerRows={headerRows}
          />
        );
      },
    });

    expect(tree.find(RowsBlockLayout).props())
      .toMatchObject({
        blockComponent: headComponent,
        cellComponent: defaultProps.cellComponent,
        rowComponent: defaultProps.rowComponent,
        columns: defaultProps.columns,
        rows: headerRows,
        getCellColSpan: defaultProps.getCellColSpan,
      });
  });

  it('should pass correct styles to the tableComponent', () => {
    const tree = shallow({
      render() {
        return (
          <StaticTableLayout
            {...{ attrs: { ...defaultProps } }}
          />
        );
      },
    });

    expect(tree.find(defaultProps.tableComponent).attributes())
      .toMatchObject({
        style: 'min-width: 400px;',
      });
  });
});
