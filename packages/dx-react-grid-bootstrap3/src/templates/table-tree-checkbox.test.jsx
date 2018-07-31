import * as React from 'react';
import { shallow } from 'enzyme';
import { TableTreeCheckbox } from './table-tree-checkbox';

describe('TableTreeCheckbox', () => {
  it('should pass style to the root element', () => {
    const tree = shallow((
      <TableTreeCheckbox
        style={{ color: 'gray' }}
      />
    ));

    expect(tree.prop('style'))
      .toMatchObject({ color: 'gray' });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableTreeCheckbox className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
