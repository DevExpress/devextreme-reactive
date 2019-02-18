import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import { LineSeries } from './line-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
  ARGUMENT_DOMAIN: 'test_argument_domain',
  getValueDomainName: () => 'test_value_domain',
  checkZeroStart: jest.fn(),
}));

describe('Line series', () => {
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
      layouts: { pane: {} },
      scales: { test_argument_domain: 'arg-scale', test_value_domain: 'val-scale' },
    },
    template: {
      series: {},
    },
  };

  it('should render path', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <LineSeries
          {...defaultProps as any}
        />
      </PluginHost>
    ));

    expect(tree.find(SeriesComponent).props()).toEqual({
      pointComponent: undefined,
      index: 1,
      coordinates: coords,
      color: 'color',
      getAnimatedStyle: undefined,
      scales: { xScale: 'arg-scale', yScale: 'val-scale' },
    });
  });
});
