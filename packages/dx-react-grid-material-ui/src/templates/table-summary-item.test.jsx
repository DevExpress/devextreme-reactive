import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { TableSummaryItem } from './table-summary-item';

// jest.mock("@mui/private-theming/useTheme");

describe('TableSummaryItem', () => {
  const defaultProps = {
    getMessage: () => 'message',
    value: 11,
    type: 'summaryType',
  };

  let classes;
  let shallow;
  beforeAll(() => {
    classes = getClasses(<TableSummaryItem {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });

  it('should render children if passed', () => {
    const tree = shallow((
      <TableSummaryItem {...defaultProps}>
        <span className="test" />
      </TableSummaryItem>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSummaryItem
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.item}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSummaryItem
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
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
