import * as React from 'react';
import { TableRow as TableRowMUI } from 'material-ui/Table';
import { createShallow } from 'material-ui/test-utils';
import { TableSelectRow } from './table-select-row';

const defaultProps = {
  selected: false,
  selectByRowClick: false,
  onToggle: () => {},
};

describe('TableSelectRow', () => {
  let shallow;

  beforeAll(() => {
    shallow = createShallow({ });
  });

  it('should have correct selected prop', () => {
    let tree = shallow((
      <TableSelectRow
        {...defaultProps}
      />
    ));

    expect(tree.find(TableRowMUI).prop('selected'))
      .toBeFalsy();

    tree = shallow((
      <TableSelectRow
        {...defaultProps}
        selected
      />
    ));
    expect(tree.find(TableRowMUI).prop('selected'))
      .toBeTruthy();
  });

  it('should handle row click', () => {
    const onToggleMock = jest.fn();
    const tree = shallow((
      <TableSelectRow
        {...defaultProps}
        onToggle={onToggleMock}
        selectByRowClick
      />
    ));

    tree.find(TableRowMUI).prop('onClick')({ stopPropagation: () => {} });
    expect(onToggleMock)
      .toBeCalled();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectRow
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
