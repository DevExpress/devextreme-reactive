import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { TableFilterCell } from './table-filter-cell';

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
});
