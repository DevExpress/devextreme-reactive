import * as React from 'react';
import { createShallow } from 'material-ui/test-utils';
import { TableSortLabel } from 'material-ui/Table';
import { SortingControl } from './sorting-control';

const defaultProps = {
  align: 'left',
  columnTitle: 'a',
  classes: {},
  onClick: () => {},
  getMessage: key => key,
};

describe('SortingControl', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ untilSelector: 'SortingControlBase' });
  });
  afterAll(() => {
    shallow.cleanUp();
  });

  it('should process nullable sortingDirection', () => {
    const tree = shallow((
      <SortingControl
        {...defaultProps}
        sortingDirection={null}
      />
    ));

    expect(tree.find(TableSortLabel).props().direction).toBeUndefined();
  });
});
