import React from 'react';
import { shallow } from 'enzyme';
import { getTableRowColumnsWithColSpan } from '@devexpress/dx-grid-core';
import { setupConsole } from '@devexpress/dx-testing';
import { RowLayout } from './row-layout';

jest.mock('@devexpress/dx-grid-core', () => ({
  getTableRowColumnsWithColSpan: jest.fn(),
}));

const defaultProps = {
  row: { key: 1, rowId: 1, height: 20 },
  columns: [
    { key: 'a', column: { name: 'a' } },
    { key: 'b', column: { name: 'b' } },
    { key: 'c', column: { name: 'c' } },
    { key: 'd', column: { name: 'd' } },
  ],
  rowComponent: () => null,
  cellComponent: () => null,
};

describe('RowLayout', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
    getTableRowColumnsWithColSpan.mockImplementation(() => defaultProps.columns);
  });

  afterEach(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  it('should render the "rowComponent" with correct properties', () => {
    const tree = shallow((
      <RowLayout
        {...defaultProps}
      />
    ));

    expect(tree.find(defaultProps.rowComponent).at(0).props())
      .toMatchObject({
        tableRow: defaultProps.row,
        style: { height: '20px' },
      });
  });

  it('should render the "cellComponent" for each column', () => {
    const tree = shallow((
      <RowLayout
        {...defaultProps}
      />
    ));

    tree.find(defaultProps.rowComponent).at(0).children().forEach((component, index) => {
      const column = defaultProps.columns[index];
      expect(component.props())
        .toMatchObject({
          tableRow: defaultProps.row,
          tableColumn: column,
        });
    });
  });

  it('can span columns', () => {
    const column = { key: 'b', column: { name: 'b' } };
    getTableRowColumnsWithColSpan.mockImplementation(() => [{ ...column, colspan: 2 }]);

    const tree = shallow((
      <RowLayout
        {...defaultProps}
        row={defaultProps.row}
      />
    ));

    expect(tree.find(defaultProps.cellComponent).at(0).props())
      .toMatchObject({
        tableRow: defaultProps.row,
        tableColumn: { ...column, colspan: 2 },
      });
  });
});
