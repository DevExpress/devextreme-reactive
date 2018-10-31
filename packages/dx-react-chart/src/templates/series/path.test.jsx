import * as React from 'react';
import { shallow } from 'enzyme';
import { Path } from './path';

describe('Path', () => {
  const defaultProps = {
    path: value => value.join('-'),
    coordinates: [1, 2, 3],
    color: 'red',
    getAnimatedStyle: jest.fn(style => style),
  };

  it('should render root element', () => {
    const tree = shallow((
      <Path
        {...defaultProps}
      />
    ));

    expect(tree.find('path').props()).toEqual({
      d: '1-2-3',
      fill: 'none',
      strokeWidth: 2,
      stroke: 'red',
    });
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

    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Path {...defaultProps} customProperty />
    ));
    const { customProperty } = tree.find('path').props();

    expect(customProperty).toBeTruthy();
  });
});
