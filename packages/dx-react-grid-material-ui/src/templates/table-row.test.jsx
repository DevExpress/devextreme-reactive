import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { TableRow } from './table-row';

describe('TableRow', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableRow className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
