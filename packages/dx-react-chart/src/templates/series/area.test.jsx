import * as React from 'react';
import { shallow } from 'enzyme';
import { Area } from './area';

describe('Area', () => {
  const defaultProps = {
    path: value => value.join('-'),
    coordinates: [1, 2, 3],
    color: 'red',
    getAnimatedStyle: jest.fn(style => style),
  };

  it('should render root element', () => {
    const tree = shallow((
      <Area
        {...defaultProps}
      />
    ));

    expect(tree.find('path').props()).toEqual({
      d: '1-2-3',
      fill: 'red',
      opacity: 0.5,
    });
  });

  it('should apply custom styles if any', () => {
    const customStyle = {
      stroke: 'red',
      strokeWidth: '2px',
    };
    const tree = shallow((
      <Area
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();

    expect(style).toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow((
      <Area {...defaultProps} customProperty />
    ));
    const { customProperty } = tree.find('path').props();

    expect(customProperty).toBeTruthy();
  });
});
