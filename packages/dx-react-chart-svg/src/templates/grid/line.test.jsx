import * as React from 'react';
import { shallow } from 'enzyme';
import { Line } from './line';

describe('Line', () => {
  it('should render line', () => {
    const {
      x1, y1, x2, y2,
    } = shallow((
      <Line
        x1={1}
        y1={2}
        x2={3}
        y2={4}
      />
    )).find('line').props();

    expect(x1).toBe(1);
    expect(y1).toBe(2);
    expect(x2).toBe(3);
    expect(y2).toBe(4);
  });
});
