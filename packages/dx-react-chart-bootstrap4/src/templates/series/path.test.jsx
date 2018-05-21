import * as React from 'react';
import { shallow } from 'enzyme';
import { Path } from './path';

describe('Path', () => {
  const defaultProps = {
    x: 1,
    y: 2,
    path: jest.fn(value => value),
    coordinates: [{ x: 1, y: 2 }, { x: 2, y: 4 }],
  };
  it('should render root element', () => {
    const tree = shallow((
      <Path
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
      <Path
        {...defaultProps}
        style={customStyle}
      />
    ));
    const { style } = tree.find('path').props();

    expect(style)
      .toEqual(customStyle);
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow(<Path {...defaultProps} className="custom-class" />);

    expect(tree.find('path').is('.custom-class.dx-c-bs4-fill-none')).toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Path {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();
    expect(customProperty)
      .toBeTruthy();
  });
});
