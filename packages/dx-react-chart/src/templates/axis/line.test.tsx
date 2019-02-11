import * as React from 'react';
import { shallow } from 'enzyme';
import { Line } from './line';

const defaultProps = {
  x1: 1, x2: 2, y1: 3, y2: 4,
};

describe('Line', () => {
  it('should render line with correct coordinates', () => {
    const { d } = shallow((
      <Line {...defaultProps} />
    )).find('path').props();

    expect(d).toBe('M 1 3 L 2 4');
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Line {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props() as any;
    expect(customProperty).toBeTruthy();
  });

  it('should pass the className to the root element', () => {
    const tree = shallow(<Line {...defaultProps} className />);
    const { className } = tree.find('path').props();
    expect(className).toBeTruthy();
  });
});
