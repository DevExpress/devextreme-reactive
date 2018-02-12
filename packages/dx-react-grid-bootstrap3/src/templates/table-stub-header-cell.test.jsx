import * as React from 'react';
import { shallow } from 'enzyme';
import { TableStubHeaderCell } from './table-stub-header-cell';

describe('TableStubHeaderCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubHeaderCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
