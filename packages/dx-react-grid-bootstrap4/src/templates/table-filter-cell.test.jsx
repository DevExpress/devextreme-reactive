import * as React from 'react';
import { shallow } from 'enzyme';
import { TableFilterCell } from './table-filter-cell';

describe('TableFilterCell', () => {
  it('should render children if passed', () => {
    const tree = shallow((
      <TableFilterCell>
        <span className="test" />
      </TableFilterCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableFilterCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableFilterCell data={{ a: 1 }} />
    ));
    expect(tree.find('th').prop('data'))
      .toEqual({ a: 1 });
  });
});
