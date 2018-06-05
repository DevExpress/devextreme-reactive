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

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Bar
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('rect').props();

    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Bar {...defaultProps} customProperty />);
    const { customProperty } = tree.find('rect').props();
    expect(customProperty).toBeTruthy();
  });

  it('should apply themeColor', () => {
    const tree = shallow(<Bar {...defaultProps} themeColor="color" />);

    expect(tree.find('rect').props().fill)
      .toBe('color');
  });
});
