import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeContent } from './table-tree-content';

describe('TableTreeContent', () => {
  it('should render children if passed', () => {
    const tree = shallow((
      <TableTreeContent>
        <span className="test" />
      </TableTreeContent>
    ));

    expect(tree.find('.test').exists())
      .toBeTruthy();
  });

  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableTreeContent
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeContent className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
