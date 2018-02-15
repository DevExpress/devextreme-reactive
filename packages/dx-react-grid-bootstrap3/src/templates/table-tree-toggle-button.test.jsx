import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeToggleButton } from './table-tree-toggle-button';

describe('TableTreeToggleButton', () => {
  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableTreeToggleButton
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeToggleButton className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
