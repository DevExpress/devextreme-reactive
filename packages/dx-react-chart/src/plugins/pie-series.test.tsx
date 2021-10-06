import * as React from 'react';
import { create as createTestRenderer } from 'react-test-renderer';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { PieSeries } from './pie-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  extendDomains: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
}));

describe('Pie series', () => {
  const SeriesComponent = () => null;
  const PointComponent = () => null;

  const defaultProps = {
    valueField: 'valueField',
    argumentField: 'argumentField',
  };

  const coords = [
    {
      value: 'value1', data: { argumentField: 'argument1' }, index: 'value1', x: 1, y: 2,
    },
    {
      value: 'value2', data: { argumentField: 'argument2' }, index: 'value2', x: 1, y: 2,
    },
    {
      value: 'value3', data: { argumentField: 'argument3' }, index: 'value3', x: 1, y: 2,
    },
  ];

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
      layouts: { pane: { width: 1, height: 2 } },
      scales: { test_argument_domain: 'arg-scale', test_value_domain: 'val-scale' },
    },
    template: {
      series: {},
    },
  };

  it('should render points', () => {
    const tree = createTestRenderer((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <PieSeries
          {...defaultProps as any}
        />
      </PluginHost>
    ));

    expect(tree.root.findByType(SeriesComponent).props).toMatchObject({
      pointComponent: PointComponent,
      index: 1,
      color: 'color',
      coordinates: coords,
      path: undefined,
      scales: { argScale: 'arg-scale', valScale: 'val-scale' },
      pane: { width: 1, height: 2 },
    });
  });
});
