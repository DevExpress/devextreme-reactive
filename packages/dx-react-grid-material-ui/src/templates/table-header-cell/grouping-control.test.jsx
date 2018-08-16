import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { GroupingControl } from './grouping-control';

const defaultProps = {
  onGroup: () => {},
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

  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <GroupingControl
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));
    expect(tree.props().data)
      .toEqual({ a: 1 });
  });

  it('should not call the onGroup function if disabled is true', () => {
    const tree = shallow(<GroupingControl {...defaultProps} disabled />);
    tree.simulate('click', { stopPropagation: () => {} });

    expect(defaultProps.onGroup)
      .not.toBeCalled();
  });
});
