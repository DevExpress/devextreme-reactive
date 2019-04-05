import * as React from 'react';
import { shallow } from 'enzyme';
import { DragBox } from './drag-box';

const defaultProps = {
  rect: { x: 1, y: 2, width: 3, height: 4 },
  fill: 'color',
  opacity: 0.3,
};

describe('DragBox', () => {
  it('should render drag box', () => {
    const tree = shallow(<DragBox {...defaultProps}/>);

    const {
      x, y, width, height, fill, opacity,
    } = tree.find('rect').props();
    expect(x).toBe(1);
    expect(y).toBe(2);
    expect(width).toBe(3);
    expect(height).toBe(4);
    expect(fill).toBe('color');
    expect(opacity).toBe(0.3);
  });
});
