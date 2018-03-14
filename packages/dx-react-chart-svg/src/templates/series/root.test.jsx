import * as React from 'react';
import { shallow } from 'enzyme';
import { Root } from './root';

describe('Root', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    d: 'M10 10',
  };
  it('should render root element', () => {
    const tree = shallow((
      <Root {...defaultProps} />
    ));
    const { transform } = tree.find('g').props();
    const { d } = tree.find('path').props();

    expect(transform).toBe('translate(1 2)');
    expect(d).toBe('M10 10');
  });

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Root
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
