import * as React from 'react';
import { shallow } from 'enzyme';
import { Bar } from './bar';

describe('Bar', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    width: 10,
    height: 20,
    value: 15,
  };

  it('should render root element', () => {
    const tree = shallow((
      <Bar
        {...defaultProps}
      />
    ));
    const {
      x, y, width, height, value,
    } = tree.find('rect').props();

    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(width).toBe(10);
    expect(height).toBe(20);
    expect(value).toBeUndefined();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Bar {...defaultProps} customProperty />);
    const { customProperty } = tree.find('rect').props();
    expect(customProperty).toBeTruthy();
  });

  it('should apply color', () => {
    const tree = shallow((
      <Bar
        color="color"
        {...defaultProps}
      />
    ));

    expect(tree.find('rect').props().fill)
      .toBe('color');
  });
});
