import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { TableSummaryItem } from './table-summary-item';

describe('TableSummaryItem', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<TableSummaryItem />);
    shallow = createShallow({ dive: true });
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableSummaryItem>
        <span className="test" />
      </TableSummaryItem>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSummaryItem className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.item}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSummaryItem data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
