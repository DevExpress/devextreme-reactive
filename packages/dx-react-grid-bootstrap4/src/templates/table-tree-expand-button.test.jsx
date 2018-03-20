import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeExpandButton } from './table-tree-expand-button';

describe('TableTreeExpandButton', () => {
  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableTreeExpandButton
        className="test"
      />
    ));

    expect(tree.prop('className'))
      .toContain('test');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeExpandButton className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
