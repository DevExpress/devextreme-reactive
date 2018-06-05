import * as React from 'react';
import { shallow } from 'enzyme';
import { Line } from './line';

const defaultProps = { width: 100, height: 100, orientation: 'horizontal' };

describe('Line', () => {
  it('should render line', () => {
    const { d } = shallow((
      <Line {...defaultProps} />
    )).find('path').props();

    expect(d).toBe('M 0 0 L 100 0');
  });

  it('should render line. Vertical', () => {
    const { d } = shallow((
      <Line {...defaultProps} orientation="vertical" />
    )).find('path').props();

    expect(d).toBe('M 0 0 L 0 100');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow(<Line {...defaultProps} className="custom-class" />);

    expect(tree.is('.custom-class.dx-c-bs4-stroke-current-color.dx-c-bs4-axis-opacity')).toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Line {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
