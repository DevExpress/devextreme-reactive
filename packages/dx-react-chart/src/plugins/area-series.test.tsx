import * as React from 'react';
import { create } from 'react-test-renderer';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { AreaSeries } from './area-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  extendDomains: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
  checkZeroStart: jest.fn(),
}));

describe('Area series', () => {
  const SeriesComponent = () => null;

  const coords = [
    { x: 1, y: 3, id: 1 },
    { x: 2, y: 5, id: 2 },
    { x: 3, y: 7, id: 3 },
    { x: 4, y: 10, id: 4 },
    { x: 5, y: 15, id: 5 },
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
    color: 'color',
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: { width: 10, height: 20 } },
      scales: {
        test_argument_domain: 'arg-scale',
        test_value_domain: 'val-scale',
      },
    },
    template: {
      series: {},
    },
  };

  it('should render path', () => {
    const tree = create((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <AreaSeries
          {...defaultProps as any}
        />
      </PluginHost>
    ));

    expect(tree.root.findByType(SeriesComponent).props).toEqual({
      pointComponent: undefined,
      index: 1,
      coordinates: coords,
      color: 'color',
      scales: { argScale: 'arg-scale', valScale: 'val-scale' },
      pane: { width: 10, height: 20 },
    });
  });
});
