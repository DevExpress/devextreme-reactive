import * as React from 'react';
import TableRowMUI from '@material-ui/core/TableRow';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TableSelectRow } from './table-select-row';

const defaultProps = {
  selected: false,
  selectByRowClick: false,
  onToggle: () => {},
};

describe('TableSelectRow', () => {
  let shallow;
  let classes;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableSelectRow {...defaultProps} />);
  });

  it('should have correct selected prop', () => {
    let tree = shallow((
      <TableSelectRow
        {...defaultProps}
      />
    ));

    expect(tree.is(`.${classes.selected}`))
      .toBeFalsy();

    tree = shallow((
      <TableSelectRow
        {...defaultProps}
        selected
      />
    ));

    expect(tree.is(`.${classes.selected}`))
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
