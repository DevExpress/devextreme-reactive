import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Slice } from './slice';

describe('Slice', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M11 11',
    value: 15,
    color: 'color',
  };
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Slice {...defaultProps} />);

  it('should render path element', () => {
    const tree = shallow((
      <Slice {...defaultProps} />
    ));
    expect(tree.find('path').exists())
      .toBeTruthy();
  });

  it('should render path element with props', () => {
    const tree = shallow((
      <Slice {...defaultProps} />
    ));
    const {
      transform, d, value, fill,
    } = tree.find('path').props();

    expect(transform)
      .toBe('translate(1 2)');
    expect(d)
      .toBe('M11 11');
    expect(fill).toBe('color');
    expect(value).toBeUndefined();
  });

  it('should render path element with custom styles', () => {
    const customStyle = {
      stroke: 'orange',
      fill: 'green',
    };
    const tree = shallow((
      <Slice
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();
    expect(style)
      .toEqual(customStyle);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow(<Slice {...defaultProps} className="custom-class" />);

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Slice {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
