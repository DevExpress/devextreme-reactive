import * as React from 'react';
import { shallow } from 'enzyme';
import { TableRow } from './table-row';

describe('TableRow', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableRow className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
