import * as React from 'react';
import { createShallow, getClasses } from 'material-ui/test-utils';
import { GroupingControl } from './grouping-control';

const defaultProps = {
  onGroup: () => {},
  align: 'left',
};

describe('GroupingControl', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<GroupingControl {...defaultProps} />);
  });

  it('should have correct css class if disable is true', () => {
    const tree = shallow(<GroupingControl {...defaultProps} disabled />);
    expect(tree.hasClass(classes.disabledGroupingControl))
      .toBeTruthy();
  });
});
