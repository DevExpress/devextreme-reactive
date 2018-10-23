import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { pointAttributes, findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { ScatterSeries } from './scatter-series';
import { PointCollection } from '../templates/series/point-collection';

jest.mock('@devexpress/dx-chart-core', () => ({
  pointAttributes: jest.fn(),
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
  checkZeroStart: jest.fn(),
}));

describe('Scatter series', () => {
  const PointComponent = () => null;

  const coords = [
    { x: 1, y: 11, index: 1 },
    { x: 2, y: 12, index: 2 },
    { x: 3, y: 13, index: 3 },
    { x: 4, y: 14, index: 4 },
    { x: 5, y: 15, index: 5 },
  ];

  pointAttributes.mockReturnValue(() => ({
    x: 4,
    y: 3,
    d: 'M12 12',
  }));

  const defaultProps = {
    argumentField: 'arg',
    valueField: 'val',
  };

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    points: coords,
    styles: 'styles',
    point: { size: 5 },
    seriesComponent: PointCollection,
    pointComponent: PointComponent,
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: {} },
      scales: {},
      getAnimatedStyle: jest.fn(),
    },
    template: {
      series: {},
    },
  };

  it('should render points', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <ScatterSeries
          {...defaultProps}
        />
      </PluginHost>));

    expect(tree.find(PointComponent)).toHaveLength(coords.length);

    coords.forEach((coord, index) => {
      const {
        d, x, y, styles,
      } = tree.find(PointComponent).get(index).props;
      expect(d).toBe('M12 12');
      expect(x).toBe(index + 1);
      expect(y).toBe(index + 11);
      expect(styles).toBe('styles');
    });
  });
});
