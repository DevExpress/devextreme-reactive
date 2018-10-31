import * as React from 'react';
import { shallow } from 'enzyme';
import { Slice } from './slice';

describe('Slice', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M11 11',
    value: 15,
    color: 'red',
  };

  it('should render path element', () => {
    const tree = shallow((
      <Slice {...defaultProps} />
    ));

    expect(tree.find('path').props()).toEqual({
      d: 'M11 11',
      fill: 'red',
      stroke: 'none',
      style: {},
    });
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

    expect(style).toEqual(customStyle);
  });


  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Slice {...defaultProps} customProperty />
    ));
    const { customProperty } = tree.find('path').props();

    expect(customProperty).toBeTruthy();
  });
});
