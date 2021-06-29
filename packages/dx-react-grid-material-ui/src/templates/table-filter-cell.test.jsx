import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TableFilterCell } from './table-filter-cell';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

const defaultProps = {
  getMessage: key => key,
  iconComponent: () => null,
};

describe('TableFilterCell', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<TableFilterCell {...defaultProps} />);
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableFilterCell {...defaultProps}>
        <span className="test" />
      </TableFilterCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableFilterCell {...defaultProps} className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableFilterCell {...defaultProps} data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });

  it('should have focus style', () => {
    let tree = shallow((<TableFilterCell {...defaultProps} />));
    expect(tree.is(`.${classes.focusedCell}`)).toBeFalsy();

    tree = shallow((<TableFilterCell {...defaultProps} updateRefForKeyboardNavigation={()=>{}} />));
    expect(tree.is(`.${classes.focusedCell}`)).toBeTruthy();
  });
});
