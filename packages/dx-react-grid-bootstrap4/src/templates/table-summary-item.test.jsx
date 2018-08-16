import * as React from 'react';
import { shallow } from 'enzyme';
import { TableSummaryItem } from './table-summary-item';

describe('TableSummaryItem', () => {
  it('should render children if passed', () => {
    const tree = shallow((
      <TableSummaryItem>
        <span className="test" />
      </TableSummaryItem>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableSummaryItem
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSummaryItem className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
