import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Path } from './path';

const defaultProps = {
  path: jest.fn(value => value),
  coordinates: [{ x: 1, y: 2 }, { x: 2, y: 4 }],
};

describe('Path', () => {
  const shallow = createShallow({ dive: true });
  const classes = getClasses(<Path {...defaultProps} />);
  it('should render root element', () => {
    const tree = shallow((
      <Path
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
      <Path
        {...defaultProps}
        style={customStyle}
        color="color"
      />
    ));
    const { style, stroke } = tree.find('path').props();

    expect(style)
      .toEqual(customStyle);
    expect(stroke)
      .toEqual('color');
  });

  it('should pass the className prop to the root element', () => {
    const tree = shallow(<Path {...defaultProps} className="custom-class" />);

    expect(tree.is(`.${classes.root}.custom-class`))
      .toBeTruthy();
  });

  it('should pass the rest property to the root element', () => {
    const tree = shallow(<Path {...defaultProps} customProperty />);
    const { customProperty } = tree.find('path').props();

    expect(customProperty)
      .toBeTruthy();
  });
});
