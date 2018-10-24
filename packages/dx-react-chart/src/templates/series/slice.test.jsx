import * as React from 'react';
import { shallow } from 'enzyme';
import { Slice } from './slice';

describe('Slice', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M11 11',
    themeColor: 'color',
    value: 15,
  };

  it('should render path element', () => {
    const tree = shallow((
      <Slice {...defaultProps} />
    ));
    expect(tree.find('path').exists()).toBeTruthy();
  });

  it('should render path element with props', () => {
    const tree = shallow((
      <Slice {...defaultProps} />
    ));
    const { d, value } = tree.find('path').props();
    expect(d).toBe('M11 11');
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
    expect(style).toEqual({
      ...customStyle,
    });
  });
});
