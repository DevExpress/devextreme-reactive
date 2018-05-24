import * as React from 'react';
import { shallow } from 'enzyme';
import { Area } from './area';

describe('Area', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    path: jest.fn(value => value),
    coordinates: [{ x: 1, y: 2 }, { x: 2, y: 4 }],
  };
  it('should render root element', () => {
    const tree = shallow((
      <Area
        {...defaultProps}
      />
    ));
    const { d, transform } = tree.find('path').props();

    expect(transform)
      .toBe('translate(1 2)');
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

  it('should pass the className prop to the root element', () => {
    const tree = shallow(<Area {...defaultProps} className="custom-class" />);

    expect(tree.find('path').is('.custom-class.dx-c-bs4-series-opacity')).toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Area {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();
    expect(customProperty)
      .toBeTruthy();
  });

  it('should apply themeColor', () => {
    const tree = shallow(<Area {...defaultProps} themeColor="color" />);

    expect(tree.find('path').props().fill)
      .toBe('color');
  });
});
