import * as React from 'react';
import { shallow } from 'enzyme';
import { TableSelectCell } from './table-select-cell';

describe('TableSelectCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
