import * as React from 'react';
import { shallow } from 'enzyme';
import { TableSkeletonCell } from './table-skeleton-cell';

describe('TableSkeletonCell', () => {
  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <TableSkeletonCell className="custom-class" />
    ));

    expect(tree.is('.dx-g-bs4-skeleton-cell.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSkeletonCell data={{ a: 1 }} />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });
});
