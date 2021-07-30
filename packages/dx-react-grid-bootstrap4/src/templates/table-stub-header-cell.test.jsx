import * as React from 'react';
import { shallow } from 'enzyme';
import { TableStubHeaderCell } from './table-stub-header-cell';

describe('TableStubHeaderCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubHeaderCell className="custom-class" />
    ));
    expect(tree.is('.p-0.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubHeaderCell data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });
});
