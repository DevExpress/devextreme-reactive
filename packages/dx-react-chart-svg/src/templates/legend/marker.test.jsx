import * as React from 'react';
import { shallow } from 'enzyme';
import { Marker } from './marker';

describe('Marker', () => {
  it('should render svg', () => {
    const tree = shallow((
      <Marker
        width={5}
        height={6}
        margin={5}
      />
    ));

    const {
      width, height, style,
    } = tree.find('svg').props();
    expect(width).toBe(5);
    expect(height).toBe(6);
    expect(style.margin).toBe(5);
  });
  it('should render text', () => {
    const tree = shallow((
      <Marker
        width={5}
        height={6}
        margin={5}
      />
    ));

    const {
      width, height,
    } = tree.find('rect').props();
    expect(width).toBe(5);
    expect(height).toBe(6);
  });
});
