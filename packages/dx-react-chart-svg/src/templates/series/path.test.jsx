import * as React from 'react';
import { shallow } from 'enzyme';
import { Path } from './path';

describe('Path', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M10 10',
  };
  it('should render root element', () => {
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));
    const { d, transform } = tree.find('path').props();

    expect(transform).toBe('translate(1 2)');
    expect(d).toBe('M10 10');
  });

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Path
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();

    expect(style).toEqual({
      ...customStyle,
      fill: 'none',
    });
  });
});
