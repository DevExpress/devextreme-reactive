import * as React from 'react';
import { shallow } from 'enzyme';
import { Tick } from './tick';

describe('Tick', () => {
  it('should render line with correct coordinates', () => {
    const {
      x1, x2, y1, y2, shapeRendering,
    } = shallow((
      <Tick
        x1={1}
        x2={2}
        y1={3}
        y2={4}
      />
    )).find('line').props();

    expect(x1).toBe(1);
    expect(x2).toBe(2);
    expect(y1).toBe(3);
    expect(y2).toBe(4);
    expect(shapeRendering).toBe('crispEdges');
  });
});
