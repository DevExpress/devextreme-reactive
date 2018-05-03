import * as React from 'react';
import { shallow } from 'enzyme';
import { Marker } from './marker';

describe('Marker', () => {
  it('should render text', () => {
    const tree = shallow((
      <Marker
        x={3}
        y={4}
        width={5}
        height={6}
      />
    ));

    const {
      x, y, width, height,
    } = tree.find('rect').props();
    expect(x).toBe(3);
    expect(y).toBe(4);
    expect(width).toBe(5);
    expect(height).toBe(6);
  });
});
