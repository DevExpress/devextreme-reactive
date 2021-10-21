import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { TableStubRow } from './table-stub-row';

describe('TableStubRow', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableStubRow className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
