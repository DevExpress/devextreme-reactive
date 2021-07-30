import * as React from 'react';
import { shallow } from 'enzyme';
import { TableStubCell } from './table-stub-cell';

describe('TableStubCell', () => {
  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableStubCell className="custom-class" />
    ));

    expect(tree.is('.p-0.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubCell data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });
});
