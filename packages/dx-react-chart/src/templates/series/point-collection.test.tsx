import * as React from 'react';
import { create } from 'react-test-renderer';
import { PointCollection } from './point-collection';

describe('PointCollection', () => {
  const TestComponent = () => null;

  it('should render bars', () => {
    const points = [
      { index: 10, custom2: 'point-1-value2', custom3: 'point-1-value3' },
      { index: 20, custom2: 'point-2-value2', custom3: 'point-2-value3' },
      { index: 30, custom2: 'point-3-value2', custom3: 'point-3-value3' },
    ];
    const tree = create((
      <PointCollection
        pointComponent={TestComponent}
        index={1}
        coordinates={points}
        custom1="series-value1"
        custom2="series-value2"
      />
    ));

    const items = tree.root.findAllByType(TestComponent);
    expect(items.length).toEqual(3);
    expect(items[0].props).toEqual({
      seriesIndex: 1,
      index: 10,
      custom1: 'series-value1',
      custom2: 'point-1-value2',
      custom3: 'point-1-value3',
    });
    expect(items[1].props).toEqual({
      seriesIndex: 1,
      index: 20,
      custom1: 'series-value1',
      custom2: 'point-2-value2',
      custom3: 'point-2-value3',
    });
    expect(items[2].props).toEqual({
      seriesIndex: 1,
      index: 30,
      custom1: 'series-value1',
      custom2: 'point-3-value2',
      custom3: 'point-3-value3',
    });
  });
});
