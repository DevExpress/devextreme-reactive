import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TableTreeCell } from './table-tree-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('TableTreeCell', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<TableTreeCell />);
    shallow = createShallow({ dive: true });
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableTreeCell>
        <span className="test" />
      </TableTreeCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableTreeCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
    expect(tree.is(`.${classes.cellNoWrap}`))
      .toBeTruthy();
    expect(tree.is(`.${classes.cellRightAlign}`))
      .toBeFalsy();
    expect(tree.is(`.${classes.cellCenterAlign}`))
      .toBeFalsy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should not apply nowrap class', () => {
    const tree = shallow((
      <TableTreeCell tableColumn={{ wordWrapEnabled: true }} />
    ));

    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
    expect(tree.is(`.${classes.cellNoWrap}`))
      .toBeFalsy();
  });

  it('should apply align right classes', () => {
    const tree = shallow((
      <TableTreeCell tableColumn={{ align: 'right' }} />
    ));

    expect(tree.is(`.${classes.cellRightAlign}`))
      .toBeTruthy();
  });

  it('should apply align center classes', () => {
    const tree = shallow((
      <TableTreeCell tableColumn={{ align: 'center' }} />
    ));

    expect(tree.is(`.${classes.cellCenterAlign}`))
      .toBeTruthy();
  });

  it('should have focus style', () => {
    let tree = shallow((<TableTreeCell />));
    expect(tree.is(`.${classes.focusedCell}`)).toBeFalsy();

    tree = shallow((<TableTreeCell setRefForKeyboardNavigation={()=>{}} />));
    expect(tree.is(`.${classes.focusedCell}`)).toBeTruthy();
  });
});
