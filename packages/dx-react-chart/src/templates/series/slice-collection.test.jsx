import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { SliceCollection } from './slice-collection';

jest.mock('@devexpress/dx-chart-core', () => ({
  getPieAnimationStyle: 'test-animation-style',
}));

describe('SliceCollection', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['<%s>'] });
  });
  afterAll(() => {
    resetConsole();
  });

  const TestComponent = () => null;

  it('should render bars', () => {
    const points = [
      {
        index: 10, custom: 'p1', x: 110, y: 120,
      },
      { index: 20, custom: 'p2' },
      { index: 30, custom: 'p3' },
    ];
    const getAnimatedStyle = jest.fn().mockReturnValue('animated-style');
    const tree = mount((
      <SliceCollection
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
      custom: 'p1',
      style: 'animated-style',
      x: 110,
      y: 120,
    });
    expect(items.get(1).props).toEqual({
      seriesIndex: 1,
      index: 20,
      color: 'color',
      custom: 'p2',
      style: 'animated-style',
    });
    expect(items.get(2).props).toEqual({
      seriesIndex: 1,
      index: 30,
      color: 'color',
      custom: 'p3',
      style: 'animated-style',
    });
    expect(getAnimatedStyle.mock.calls).toEqual([
      [{ tag: 'style' }, 'test-animation-style', 'test-scales', points[0]],
      [{ tag: 'style' }, 'test-animation-style', 'test-scales', points[1]],
      [{ tag: 'style' }, 'test-animation-style', 'test-scales', points[2]],
    ]);
    expect(tree.find('g').props().transform).toEqual('translate(110 120)');
  });
});
