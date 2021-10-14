import * as React from 'react';
import { createShallow, getClasses } from '@devexpress/dx-testing';
import { Table } from './table';

describe('Table', () => {
  const defaultProps = {
    ref: React.createRef(),
  };
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <Table {...defaultProps}>
        <tbody />
      </Table>,
    );
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
