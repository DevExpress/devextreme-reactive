import React from 'react';
import { createShallow } from 'material-ui/test-utils';
import { Table } from './table';

describe('Table', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Table className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
