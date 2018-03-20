import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeCell } from './table-tree-cell';

describe('TableTreeCell', () => {
  it('should render children if passed', () => {
    const tree = shallow((
      <TableTreeCell>
        <span className="test" />
      </TableTreeCell>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableTreeCell
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
