import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Point } from './point';

describe('Point', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M11 11',
    value: 10,
  };
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Point {...defaultProps} />);

  it('should render path element', () => {
    const tree = shallow((
      <Point
        {...defaultProps}
      />
    ));
    expect(tree.find('path').exists())
      .toBeTruthy();
  });

  it('should render path element with props', () => {
    const tree = shallow((
      <Point {...defaultProps} />
    ));

    const { transform, d } = tree.find('path').props();

    expect(transform)
      .toBe('translate(1 2)');
    expect(d)
      .toBe('M11 11');
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
    expect(style)
      .toEqual({
        ...customStyle,
      });
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow(<Point {...defaultProps} className="custom-class" />);

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Point {...defaultProps} customProperty />);

    const { customProperty } = tree.find('path').props();

    expect(customProperty)
      .toBeTruthy();
  });

  it('should apply themeColor', () => {
    const tree = shallow((
      <Point
        themeColor="color"
        {...defaultProps}
      />
    ));

    expect(tree.find('path').props().fill)
      .toBe('color');
  });
});
