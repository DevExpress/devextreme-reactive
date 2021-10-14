import * as React from 'react';
import { create } from 'react-test-renderer';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { BarSeries } from './bar-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  dBar: jest.fn(),
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  extendDomains: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
}));

describe('Bar series', () => {
  const SeriesComponent = () => null;
  const PointComponent = () => null;

  const coords = [
    {
      x: 1, y: 3, y1: 6, index: 1,
    },
    {
      x: 2, y: 5, y1: 8, index: 2,
    },
    {
      x: 3, y: 7, y1: 11, index: 3,
    },
  ];

  const defaultProps = {
    valueField: 'valueField',
    argumentField: 'argumentField',
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

  it('should render bars', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <BarSeries
          {...defaultProps as any}
        />
      </PluginHost>
    )).root;

    expect(tree.findByType(SeriesComponent).props).toEqual({
      pointComponent: PointComponent,
      index: 1,
      color: 'color',
      coordinates: coords,
      path: undefined,
      scales: { argScale: 'arg-scale', valScale: 'val-scale' },
      pane: { width: 10, height: 20 },
    });
  });
});
