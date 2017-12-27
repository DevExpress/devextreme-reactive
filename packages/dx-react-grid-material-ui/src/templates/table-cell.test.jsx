import React from 'react';
import { TableCell as TableCellMUI } from 'material-ui';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { TableCell } from './table-cell';

describe('TableCell', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<TableCell />);
    shallow = createShallow({ dive: true });
  });

  it('should have correct text alignment', () => {
    let tree = shallow(<TableCell />);
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeFalsy();

    tree = shallow(<TableCell tableColumn={{ align: 'left' }} />);
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeFalsy();

    tree = shallow(<TableCell tableColumn={{ align: 'right' }} />);
    expect(tree.find(TableCellMUI).hasClass(classes.cellRightAlign)).toBeTruthy();
  });

  it('should have correct text', () => {
    const tree = shallow(<TableCell value="text" />);
    expect(tree.childAt(0).text()).toBe('text');
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableCell>
        <span className="test" />
      </TableCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
