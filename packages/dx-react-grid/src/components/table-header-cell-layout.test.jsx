import React from 'react';
import { shallow } from 'enzyme';
import { TableHeaderCellLayout } from './table-header-cell-layout';

const defaultProps = {
  column: { name: 'a' },
  cellComponent: () => null,
};

describe('TableHeaderCellLayout', () => {
  it('should render cellComponent with correct props', () => {
    const tree = shallow((
      <TableHeaderCellLayout
        {...defaultProps}
        otherProp
      />
    ));

    expect(tree.find(defaultProps.cellComponent).props())
      .toMatchObject({
        column: defaultProps.column,
        otherProp: true,
      });
  });

  it('should render DragSource around cellComponent if dragging is allowed', () => {
    const tree = shallow((
      <TableHeaderCellLayout
        {...defaultProps}
        allowDragging
      />
    ));

    expect(tree.find('DragSource').exists())
      .toBeTruthy();
    expect(tree.find('DragSource').props())
      .toMatchObject({
        onStart: expect.any(Function),
        onEnd: expect.any(Function),
        getPayload: expect.any(Function),
      });
  });

  it('should supply correct payload for the DragSource rendered', () => {
    const tree = shallow((
      <TableHeaderCellLayout
        {...defaultProps}
        allowDragging
      />
    ));

    expect(tree.find('DragSource').prop('getPayload')())
      .toEqual([{ type: 'column', columnName: defaultProps.column.name }]);
  });

  it('should render cellComponent as draft while dragging', () => {
    const tree = shallow((
      <TableHeaderCellLayout
        {...defaultProps}
        allowDragging
      />
    ));

    tree.setState({ dragging: true });

    expect(tree.find(defaultProps.cellComponent).prop('draft'))
      .toBeTruthy();
  });
});
