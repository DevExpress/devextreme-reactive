import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Table, classes } from './table';

describe('Table', () => {
  const defaultProps = {
    ref: React.createRef(),
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Table
        {...defaultProps}
        className="custom-class"
      >
        <tbody />
      </Table>
    ));

    expect(tree.is(`.${classes.table}`))
      .toBeTruthy();

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Table
        {...defaultProps}
        data={{ a: 1 }}
      >
        <tbody />
      </Table>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
