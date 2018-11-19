import * as React from 'react';
import { mount } from 'enzyme';
import { PointCollection } from './point-collection';

jest.mock('@devexpress/dx-chart-core', () => ({
  getScatterAnimationStyle: 'test-animation-style',
  pointAttributes: options => point => ({ point: `${options}-${point.index}` }),
}));

describe('PointCollection', () => {
  const TestComponent = () => null;

  it('should render bars', () => {
    const points = [
      { index: 10, custom: 'p1' },
      { index: 20, custom: 'p2' },
      { index: 30, custom: 'p3' },
    ];
    const getAnimatedStyle = jest.fn().mockReturnValue('animated-style');
    const tree = mount((
      <PointCollection
        pointComponent={TestComponent}
        index={1}
        coordinates={points}
        point="test-point"
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
      point: 'test-point-10',
      custom: 'p1',
      style: 'animated-style',
    });
    expect(items.get(1).props).toEqual({
      seriesIndex: 1,
      index: 20,
      color: 'color',
      point: 'test-point-20',
      custom: 'p2',
      style: 'animated-style',
    });
    expect(items.get(2).props).toEqual({
      seriesIndex: 1,
      index: 30,
      color: 'color',
      point: 'test-point-30',
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
