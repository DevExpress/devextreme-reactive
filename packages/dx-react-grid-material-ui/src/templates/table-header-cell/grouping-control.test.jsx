import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { GroupingControl } from './grouping-control';

const defaultProps = {
  onGroup: jest.fn(),
  align: 'left',
};

describe('GroupingControl', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<GroupingControl {...defaultProps} />);
  });

  it('should have correct css class if disabled is true', () => {
    const tree = shallow(<GroupingControl {...defaultProps} disabled />);
    expect(tree.hasClass(classes.disabledGroupingControl))
      .toBeTruthy();
  });

  it('should not call the onGroup function if disabled is true', () => {
    const tree = shallow(<GroupingControl {...defaultProps} disabled />);
    tree.simulate('click', { stopPropagation: () => {} });

    expect(defaultProps.onGroup)
      .not.toBeCalled();
  });
});
