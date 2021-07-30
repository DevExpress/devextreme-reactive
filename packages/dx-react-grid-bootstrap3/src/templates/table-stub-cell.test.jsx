import * as React from 'react';
import { shallow } from 'enzyme';
import { TableStubCell } from './table-stub-cell';

describe('TableStubCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
