import * as React from 'react';
import { shallow } from 'enzyme';
import { Line } from './line';

describe('Line', () => {
  it('should render line', () => {
    const {
      x1, y1, x2, y2,
    } = shallow((
      <Line
        width={100}
        height={100}
        orientation="horizontal"
      />
    )).find('line').props();

    expect(x1).toBe(0);
    expect(y1).toBe(0);
    expect(x2).toBe(100);
    expect(y2).toBe(0);
  });

  it('should render line. Vertical', () => {
    const {
      x1, y1, x2, y2,
    } = shallow((
      <Line
        width={100}
        height={100}
        orientation="vertical"
      />
    )).find('line').props();

    expect(x1).toBe(0);
    expect(y1).toBe(0);
    expect(x2).toBe(0);
    expect(y2).toBe(100);
  });
});
