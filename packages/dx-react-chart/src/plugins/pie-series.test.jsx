import * as React from 'react';
import { mount } from 'enzyme';
import { PluginHost } from '@devexpress/dx-react-core';
import { findSeriesByName } from '@devexpress/dx-chart-core';
import { pluginDepsToComponents } from '@devexpress/dx-react-core/test-utils';
import { PieSeries } from './pie-series';

jest.mock('@devexpress/dx-chart-core', () => ({
  findSeriesByName: jest.fn(),
  addSeries: jest.fn(),
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

  findSeriesByName.mockReturnValue({
    ...defaultProps,
    index: 1,
    points: coords,
    seriesComponent: SeriesComponent,
    pointComponent: PointComponent,
    color: 'color',
  });

  const defaultDeps = {
    getter: {
      layouts: { pane: { } },
      scales: { test_argument_domain: 'arg-scale', test_value_domain: 'val-scale' },
    },
    template: {
      series: {},
    },
  };

  it('should render points', () => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}

        <PieSeries
          {...defaultProps}
        />
      </PluginHost>
    ));

    expect(tree.find(SeriesComponent).props()).toEqual({
      pointComponent: PointComponent,
      index: 1,
      color: 'color',
      coordinates: coords,
      path: undefined,
      getAnimatedStyle: undefined,
      scales: { xScale: 'arg-scale', yScale: 'val-scale' },
    });
  });
});
