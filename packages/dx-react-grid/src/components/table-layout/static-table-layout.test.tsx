import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { StaticTableLayout } from './static-table-layout';

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
  containerComponent: () => null,
  tableComponent: () => null,
  bodyComponent: () => null,
  cellComponent: () => null,
  rowComponent: () => null,
  getCellColSpan: () => 1,
  tableRef: React.createRef(),
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
    const tree = shallow((
      <StaticTableLayout
        {...defaultProps}
      />
    ));

    expect(tree.find('ColumnGroup').props())
      .toMatchObject({
        columns: defaultProps.columns,
      });
  });

  it('should render the body RowsBlockLayout', () => {
    const tree = shallow((
      <StaticTableLayout
        {...defaultProps}
      />
    ));

    expect(tree.find('RowsBlockLayout').props())
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
    const headComponent = () => null;
    const headerRows = defaultProps.bodyRows.slice(0, 1);

    const tree = shallow((
      <StaticTableLayout
        {...defaultProps}
        headComponent={headComponent}
        headerRows={headerRows}
      />
    ));

    expect(tree.find('RowsBlockLayout').at(0).props())
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
    const tree = shallow((
      <StaticTableLayout
        {...defaultProps}
      />
    ));

    expect(tree.find(defaultProps.tableComponent).props())
      .toMatchObject(expect.objectContaining({
        style: {
          minWidth: '400px',
        },
      }));
  });
});
