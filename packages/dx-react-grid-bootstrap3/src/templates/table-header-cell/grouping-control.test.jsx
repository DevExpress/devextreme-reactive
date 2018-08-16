import * as React from 'react';
import { shallow } from 'enzyme';

import { GroupingControl } from './grouping-control';

describe('GroupingControl', () => {
  const defaultProps = {
    onGroup: () => {},
  };
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
  it('should add custom styles', () => {
    const tree = shallow((
      <GroupingControl
        {...defaultProps}
        style={{ color: 'red' }}
      />
    ));
    expect(tree.find('div').props().style)
      .toMatchObject({
        textAlign: 'right',
        color: 'red',
      });
  });
});
