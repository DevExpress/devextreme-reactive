import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { TableSkeletonCell, classes } from './table-skeleton-cell';

describe('TableSkeletonCell', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <TableSkeletonCell className="custom-class" />
    ));

    expect(tree.is(`.${classes.cell}`))
      .toBeTruthy();

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSkeletonCell data={{ a: 1 }} />
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
