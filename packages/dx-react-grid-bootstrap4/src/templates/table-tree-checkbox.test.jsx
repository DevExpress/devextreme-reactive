import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeCheckbox } from './table-tree-checkbox';

describe('TableTreeCheckbox', () => {
  it('should pass className to the root element', () => {
    const tree = shallow((
      <TableTreeCheckbox
        className="test"
      />
    ));

    expect(tree.prop('className'))
      .toContain('test');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCheckbox className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
