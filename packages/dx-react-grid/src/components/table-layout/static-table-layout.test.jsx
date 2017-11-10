import React from 'react';
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
  rows: [
    { key: 1, rowId: 1 },
    { key: 2, rowId: 2 },
    { key: 3, rowId: 3 },
  ],
  containerTemplate: () => null,
  tableTemplate: () => null,
  bodyTemplate: () => null,
  cellTemplate: () => null,
  rowTemplate: () => null,
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
        blockTemplate: defaultProps.bodyTemplate,
        cellTemplate: defaultProps.cellTemplate,
        rowTemplate: defaultProps.rowTemplate,
        columns: defaultProps.columns,
        rows: defaultProps.rows,
      });
  });

  it('should render the head RowsBlockLayout', () => {
    const headTemplate = () => null;
    const headerRows = defaultProps.rows.slice(0, 1);

    const tree = shallow((
      <StaticTableLayout
        {...defaultProps}
        headTemplate={headTemplate}
        headerRows={headerRows}
      />
    ));

    expect(tree.find('RowsBlockLayout').at(0).props())
      .toMatchObject({
        blockTemplate: headTemplate,
        cellTemplate: defaultProps.cellTemplate,
        rowTemplate: defaultProps.rowTemplate,
        columns: defaultProps.columns,
        rows: headerRows,
      });
  });

  it('should pass correct styles to the tableTemplate', () => {
    const tree = shallow((
      <StaticTableLayout
        {...defaultProps}
      />
    ));

    expect(tree.find('TemplateRenderer').at(0).children('TemplateRenderer').props())
      .toMatchObject(expect.objectContaining({
        template: defaultProps.tableTemplate,
        params: {
          style: {
            minWidth: '400px',
          },
        },
      }));
  });
});
