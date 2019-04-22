import * as React from 'react';
import { shallow } from 'enzyme';
import { TableSkeletonCell } from './table-skeleton-cell';

describe('TableSkeletonCell', () => {
  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSkeletonCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });
});
