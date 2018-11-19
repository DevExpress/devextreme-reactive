import * as React from 'react';
import { mount } from 'enzyme';
import { BarCollection } from './bar-collection';

jest.mock('@devexpress/dx-chart-core', () => ({
  getAreaAnimationStyle: 'test-animation-style',
  dBar: point => ({ bar: `point-${point.index}` }),
}));

describe('BarCollection', () => {
  const TestComponent = () => null;

  it('should render bars', () => {
    const points = [
      { index: 10, custom: 'p1' },
      { index: 20, custom: 'p2' },
      { index: 30, custom: 'p3' },
    ];
    const getAnimatedStyle = jest.fn().mockReturnValue('animated-style');
    const tree = mount((
      <BarCollection
        pointComponent={TestComponent}
        index={1}
        coordinates={points}
        color="color"
        style={{ tag: 'style' }}
        getAnimatedStyle={getAnimatedStyle}
        scales="test-scales"
      />
    ));

    const items = tree.find(TestComponent);
    expect(items.length).toEqual(3);
    expect(items.get(0).props).toEqual({
      seriesIndex: 1,
      index: 10,
      color: 'color',
      bar: 'point-10',
      custom: 'p1',
      style: 'animated-style',
    });
    expect(items.get(1).props).toEqual({
      seriesIndex: 1,
      index: 20,
      color: 'color',
      bar: 'point-20',
      custom: 'p2',
      style: 'animated-style',
    });
    expect(items.get(2).props).toEqual({
      seriesIndex: 1,
      index: 30,
      color: 'color',
      bar: 'point-30',
      custom: 'p3',
      style: 'animated-style',
    });
    expect(getAnimatedStyle.mock.calls).toEqual([
      [{ tag: 'style' }, 'test-animation-style', 'test-scales'],
      [{ tag: 'style' }, 'test-animation-style', 'test-scales'],
      [{ tag: 'style' }, 'test-animation-style', 'test-scales'],
    ]);
  });
});
