import * as React from 'react';
import { shallow } from 'enzyme';
import { Area } from './area';

describe('Area', () => {
  const defaultProps = {
    path: jest.fn(value => value),
    coordinates: [{ x: 1, y: 2 }, { x: 2, y: 4 }],
    seriesName: 'seriesName',
    getAnimatedStyle: jest.fn(style => style),
  };

  it('should render root element', () => {
    const tree = shallow((
      <Area
        {...defaultProps}
      />
    ));
    const { d } = tree.find('path').props();

    expect(d)
      .toEqual([{ x: 1, y: 2 }, { x: 2, y: 4 }]);
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

    expect(style)
      .toEqual(customStyle);
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Area {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();
    expect(customProperty)
      .toBeTruthy();
  });

  it('should apply color', () => {
    const tree = shallow(<Area {...defaultProps} color="color" />);

    expect(tree.find('path').props().fill)
      .toBe('color');
  });
});
