import * as React from 'react';
import { shallow } from 'enzyme';
import { Pattern } from './pattern';

const defaultProps = {
  id: 'id-test',
  color: 'color-test',
};

describe('Pattern', () => {
  it('should create pattern', () => {
    const tree = shallow(<Pattern {...defaultProps} />);

    const {
      id, width, height, patternUnits,
    } = tree.find('pattern').props();

    expect(id).toBe('id-test');
    expect(width).toBe(6);
    expect(height).toBe(6);
    expect(patternUnits).toBe('userSpaceOnUse');
    expect(tree.find('defs')).toBeTruthy();
  });

  it('should create path and rect in pattern', () => {
    const tree = shallow(<Pattern {...defaultProps} />);

    expect(tree.find('rect').props()).toEqual({
      x: 0,
      y: 0,
      width: 6,
      height: 6,
      fill: 'color-test',
      opacity: 0.75,
    });

    expect(tree.find('path').props()).toEqual({
      d: 'M 3 -3 L -3 3 M 0 6 L 6 0 M 9 3 L 3 9',
      strokeWidth: 2,
      stroke: 'color-test',
    });
  });
});
