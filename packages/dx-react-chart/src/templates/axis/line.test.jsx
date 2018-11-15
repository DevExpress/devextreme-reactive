import * as React from 'react';
import { shallow } from 'enzyme';
import { Line } from './line';

describe('Line', () => {
  const defaultProps = { width: 80, height: 70 };

  it('should render line', () => {
    const { d } = shallow((
      <Line {...defaultProps} />
    )).find('path').props();

    expect(d).toBe('M 0 0 L 80 70');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Line {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();

    expect(customProperty).toBeTruthy();
  });
});
