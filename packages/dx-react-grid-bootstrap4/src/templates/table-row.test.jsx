import * as React from 'react';
import { shallow } from 'enzyme';
import { TableRow } from './table-row';

describe('TableRow', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableRow data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });
});
