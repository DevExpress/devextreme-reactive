import * as React from 'react';
import { shallow } from 'enzyme';
import { Slice } from './slice';

describe('Slice', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M11 11',
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
    const { transform, d, style } = tree.find('path').props();
    expect(transform).toBe('translate(1 2)');
    expect(d).toBe('M11 11');
    expect(style).toEqual({
      stroke: 'none',
      strokeWidth: '1px',
      fill: 'black',
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
    expect(style).toEqual({
      ...customStyle,
      strokeWidth: '1px',
    });
  });
});
