import * as React from 'react';
import { shallow } from 'enzyme';
import { Tick } from './tick';

describe('Tick', () => {
  it('should render line with correct coordinates', () => {
    const line = shallow((
      <Tick
        x1={1}
        x2={2}
        y1={3}
        y2={4}
      />
    )).find('line');

    expect(line.props().x1).toBe(1);
    expect(line.props().x2).toBe(2);
    expect(line.props().y1).toBe(3);
    expect(line.props().y2).toBe(4);
  });
});
