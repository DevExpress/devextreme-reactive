import * as React from 'react';
import { shallow } from 'enzyme';
import { TableStubRow } from './table-stub-row';

describe('TableStubRow', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubRow className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
