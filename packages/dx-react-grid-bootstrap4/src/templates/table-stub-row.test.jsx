import * as React from 'react';
import { shallow } from 'enzyme';
import { TableStubRow } from './table-stub-row';

describe('TableStubRow', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubRow data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });
});
