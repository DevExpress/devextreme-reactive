import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Table } from './table';

describe('Table', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <Table>
        <tbody />
      </Table>,
    );
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <Table className="custom-class">
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
      <Table data={{ a: 1 }}>
        <tbody />
      </Table>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
