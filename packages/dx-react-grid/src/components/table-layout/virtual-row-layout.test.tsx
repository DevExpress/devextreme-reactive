import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { VirtualRowLayout } from './virtual-row-layout';

const defaultProps = {
  row: { key: 1, rowId: 1, height: 20 },
  cells: [
    { column: { key: 'a', column: { name: 'a' } }, colSpan: 1 },
    { column: { key: 'b', column: { name: 'b' } }, colSpan: 1 },
    { column: { key: 'c', column: { name: 'c' } }, colSpan: 1 },
    { column: { key: 'd', column: { name: 'd' } }, colSpan: 1 },
  ],
  rowComponent: () => null,
  cellComponent: () => null,
};

describe('VirtualRowLayout', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the "rowComponent" with correct properties', () => {
    const tree = shallow((
      <VirtualRowLayout
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
      <VirtualRowLayout
        {...defaultProps}
      />
    ));

    const cells = tree.find(defaultProps.rowComponent).at(0).children();
    expect(cells)
      .toHaveLength(4);
    tree.find(defaultProps.rowComponent).at(0).children().forEach((cell, index) => {
      const { column, colSpan } = defaultProps.cells[index];
      expect(cell.props())
        .toMatchObject({
          tableRow: defaultProps.row,
          tableColumn: column,
          colSpan,
        });
    });
  });

  it('should not rerender row if its props are the same', () => {
    const Row = jest.fn(() => null);
    const props = { ...defaultProps, rowComponent: Row };
    const tree = mount((
      <VirtualRowLayout
        {...props}
      />
    ));
    tree.setProps({
      row: defaultProps.row,
      cells: defaultProps.cells.map(({ column, colSpan }) => ({ column, colSpan })),
    });

    expect(Row.mock.calls)
      .toHaveLength(1);
  });
});
