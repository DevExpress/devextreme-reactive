import * as React from 'react';
import { create } from 'react-test-renderer';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { ScatterSeries } from './scatter-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  extendDomains: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
  checkZeroStart: jest.fn(),
}));

describe('Scatter series', () => {
  const SeriesComponent = () => null;
  const PointComponent = () => null;

  const coords = [
    { x: 1, y: 11, index: 1 },
    { x: 2, y: 12, index: 2 },
    { x: 3, y: 13, index: 3 },
    { x: 4, y: 14, index: 4 },
    { x: 5, y: 15, index: 5 },
  ];

  const defaultProps = {
    argumentField: 'arg',
    valueField: 'val',
  };

  (findSeriesByName as jest.Mock).mockReturnValue({
    ...defaultProps,
    index: 1,
    points: coords,
    seriesComponent: SeriesComponent,
    pointComponent: PointComponent,
    color: 'color',
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 10, height: 20 } },
      scales: { test_argument_domain: 'arg-scale', test_value_domain: 'val-scale' },
    },
    template: {
      series: {},
    },
  };

  it('should render points', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <ScatterSeries
          {...defaultProps as any}
        />
      </PluginHost>));

    expect(tree.root.findByType(SeriesComponent).props).toEqual({
      index: 1,
      pane: { width: 10, height: 20 },
      path: undefined,
      pointComponent: PointComponent,
      scales: { argScale: 'arg-scale', valScale: 'val-scale' },
      color: 'color',
      coordinates: coords,
    });
  });
});
