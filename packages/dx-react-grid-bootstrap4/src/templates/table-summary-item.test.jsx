import * as React from 'react';
import { shallow } from 'enzyme';
import { TableSummaryItem } from './table-summary-item';

describe('TableSummaryItem', () => {
  const defaultProps = {
    getMessage: () => 'message',
    value: 11,
    type: 'summaryType',
  };

  it('should render children if passed', () => {
    const tree = shallow((
      <TableSummaryItem {...defaultProps}>
        <span className="test" />
      </TableSummaryItem>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSummaryItem
        {...defaultProps}
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSummaryItem
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class.dx-g-bs4-table-summary-item'))
      .toBeTruthy();
  });

  it('should use getMessage to format a summary caption', () => {
    const tree = shallow((
      <TableSummaryItem
        getMessage={type => `${type.toUpperCase()}`}
        value={10}
        type="total"
      >
        <span>10</span>
      </TableSummaryItem>
    ));

    expect(tree.text())
      .toBe('TOTAL:\xa0\xa010');
  });
});
