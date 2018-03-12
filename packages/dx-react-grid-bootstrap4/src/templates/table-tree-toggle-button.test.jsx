import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeToggleButton } from './table-tree-toggle-button';

describe('TableTreeToggleButton', () => {
  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableTreeToggleButton
        className="test"
      />
    ));

    expect(tree.prop('className'))
      .toContain('test');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeToggleButton className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
