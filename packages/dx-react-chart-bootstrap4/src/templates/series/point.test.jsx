import * as React from 'react';
import { shallow } from 'enzyme';
import { Point } from './point';

describe('Point', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M11 11',
    value: 10,
  };

  it('should render path element', () => {
    const tree = shallow((
      <Point
        {...defaultProps}
      />
    ));
    expect(tree.find('path').exists()).toBeTruthy();
  });

  it('should render path element with props', () => {
    const tree = shallow((
      <Point {...defaultProps} />
    ));
    const { transform, d } = tree.find('path').props();
    expect(transform).toBe('translate(1 2)');
    expect(d).toBe('M11 11');
  });

  it('should render path element with custom styles', () => {
    const customStyle = {
      stroke: 'orange',
      fill: 'green',
    };
    const tree = shallow((
      <Point
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();
    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Point {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();
    expect(customProperty).toBeTruthy();
  });
});
